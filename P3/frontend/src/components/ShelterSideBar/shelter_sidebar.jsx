import React from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router
import { useState } from 'react';


const Sidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  return (
    <div className="d-flex flex-column align-items-sm-start px-3 pt-2 text-white">
      <div className="w-100 text-start">
        <button
          className="btn btn-link fs-4 text-color-baby-blue bold d-md-none"
          onClick={toggleSettings}
        >
          Settings
        </button>
        <span className="fs-4 text-color-baby-blue bold d-none d-md-inline">
          Settings
        </span>
      </div>
      <div className={`${isSettingsOpen ? 'd-block' : 'd-none'} d-md-block`}>
        <ul className="nav nav-pills flex-column mb-0 align-items-sm-start" id="menu">
          <li className="nav-item">
            <Link to="/shelter-account-update-page" className="btn-link text-color-baby-blue text-decoration-none px-0">
              <i className="fs-4 bi-house"></i> <span className="fs-5">Edit Profile</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pet_listings/1/" className="btn-link text-color-baby-blue text-decoration-none px-0">
              <i className="fs-4 bi-house"></i> <span className="fs-5">Create Listing</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link px-0 align-middle" data-bs-toggle="collapse">
              <i className="fs-4 bi-speedometer2"></i> <span className="fs-5 text-color-baby-blue bold">Listings</span>
            </Link>
            <ul className="collapse show nav flex-column ms-3" id="submenu1" data-bs-parent="#menu">
              <li className="w-100 mb-2">
                <Link to="/shelter-management-page-active" className="btn-link text-color-baby-blue text-decoration-none">
                  <span>Active Listings</span>
                </Link>
              </li>
              <li className="w-100 mb-2">
                <Link to="/shelter-management-page-pending" className="btn-link text-color-baby-blue text-decoration-none">
                  <span>Pending Listing</span>
                </Link>
              </li>
              <li className="w-100 mb-2">
                <Link to="/shelter-management-page-past" className="btn-link text-color-baby-blue text-decoration-none">
                  <span>Past Listings</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <Link to="/shelter-detail-page" className="btn-link text-color-baby-blue bold text-decoration-none px-0">
          <i className="fs-4 bi-house"></i> <span className="fs-auto">Back To Profile</span>
        </Link>
      </div>
    </div>
  );
};


export default Sidebar;
