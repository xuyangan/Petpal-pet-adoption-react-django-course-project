import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const ApplicationsDashboardSeeker = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortByCreationTime, setSortByCreationTime] = useState(true);

  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    // Fetch applications based on the current state
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/applications/list/?page=${currentPage}&sort_by_creation_time=${sortByCreationTime}`,
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
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };
  
    fetchApplications();
  }, [currentPage, searchQuery, statusFilter, sortByCreationTime]);
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortByCreationTime(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-5">
      <h1>My Applications</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span>Sort by:</span>
        <select className="form-select w-auto" onChange={handleSortChange}>
          <option value="mostRecent">Most Recent Application</option>
          <option value="oldest">Oldest Application</option>
          <option value="name">Name</option>
        </select>
      </div>
      <div className="row">
        {applications.length > 0 ? (
          applications.map((application) => (
            <div className="col-md-4 mb-4" key={application.id}>
              <div className="card shadow-baby-blue">
                <img src={application.pet_image} className="card-img-top" alt="Pet Name" />
              <div className="card-body">
                <h5 className="card-title">{application.pet_name}</h5>
                <p className="card-text mb-2">Submitted {application.submitted_time} ago</p>
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <div>
                    <Link to={`/applications/view/${application.id}/seeker`} className="btn btn-primary m-3">
                      View Application
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            </div>
          ))
        ) : (
          <p>No applications found.</p>
        )}
      </div>
      {/* Pagination Component */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ApplicationsDashboardSeeker;
