import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const ApplicationsDashboardSeeker = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [statusSortBy, setStatusSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    // Fetch applications based on the current state
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/applications/list/?page=${currentPage}&${sortBy}=true&status=${statusSortBy}&pet_name=${searchTerm}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        const data = await response.json();
        setApplications(data.results ?? []); // Provide a default empty array if 'results' is undefined
        const totalCount = data.count ?? 0;
        const pages = Math.ceil(totalCount / 5); // Assuming 5 items per page, adjust as needed
        setTotalPages(pages);
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };
  
    fetchApplications();
  }, [currentPage, statusSortBy, sortBy, searchTerm, authToken]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleStatusSortChange = (e) => {
    setStatusSortBy(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Trigger a search when the submit button is clicked
    setCurrentPage(1); // Reset to the first page when a new search is initiated
  };

  const getTimeDifference = (timestamp) => {
    const currentDate = new Date();
    const updatedDate = new Date(timestamp);
    const timeDifference = currentDate - updatedDate;
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <section className="container py-5">
      <div className="mt-5">
        <h1>My Applications</h1>
        <form onSubmit={handleSearchSubmit}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Pet Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span></span>
          <select className="form-select w-auto" onChange={handleSortChange}>
            <option value=""> Sort by Time </option>
            <option value="sort_by_creation_time">Creation Time</option>
            <option value="sort_by_last_update_time">Last Updated Time</option>
          </select>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span></span>
          <select className="form-select w-auto" onChange={handleStatusSortChange}>
            <option value=""> Sort by Status </option>
            <option value="pending">Pending</option>
            <option value="withdrawn">Withdrawn</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>
        <div className="row">
          {applications.length > 0 ? (
            applications.map((application) => (
              <div className="col-md-12 mb-4" key={application.id}>
                <div className="card shadow-baby-blue">
                  <div className="card-body d-flex align-items-center justify-content-between">
                      {/* Left column */}
                      <div>
                        <h5 className="card-title">{application.pet_name}</h5>
                        <p className="card-text mb-1">Submitted {getTimeDifference(application.created_at)}</p>
                      </div>
                      {/* Right column */}
                      <div>
                        <Link to={`/applications/${application.id}/messages`} className="btn btn-outline-primary m-3">
                          Message
                        </Link>
                        <Link to={`/applications/view/${application.id}/seeker`} className="btn btn-primary">
                          View Application
                        </Link>
                      </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4>No applications found.</h4>
          )}
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center">
            <button
              className="btn btn-primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &#8592;
            </button>
            <button
              className="btn btn-primary m-3"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &#8594;
            </button>
          </div>
      </div>
    </section>

  );
};

export default ApplicationsDashboardSeeker;
