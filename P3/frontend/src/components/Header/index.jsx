import React from 'react';

function SeekerHeader() {
    return (
        <nav className="navbar navbar-expand-lg bg-color-baby-blue default-shadow" data-bs-theme="dark">
            <div className="container">
                <a className="navbar-brand" href="home-page.html">PetPal</a>
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="home-page.html">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="pet-application-page.html">Applications</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active current" aria-current="page" href="advanced-search-page.html">Explore</a>
                        </li>
                    </ul>

                    <div className="dropdown pr-3">
                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="notificationDropdown"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-bell"></i>
                            <span className="badge bg-danger">2</span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end bg-color-baby-blue" aria-labelledby="notificationDropdown">
                            <h2>Notifications - <span>2</span></h2>
                            <li><a className="dropdown-item" href="seeker-notification-page.html">
                                <div className="text">
                                    <h4>New Message from: Tail Tales Retreat</h4>
                                    <p>Do you live with a roommate?</p>
                                </div>
                            </a></li>
                            <li><a className="dropdown-item">
                                    <div className="text">
                                        <h4>System</h4>
                                        <p>New pet has been added! Click to view!</p>
                                    </div>
                                </a></li>
                            <li><a className="dropdown-viewall" href="seeker-notification-page.html">View All</a></li>
                        </ul>
                    </div>
                    <div className="dropdown align-items-center">
                        <a
                            href="#"
                            className="d-flex align-items-center text-color-baby-blue text-decoration-none dropdown-toggle"
                            id="dropdownUser1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className="profile-container">
                                <img
                                    src="https://github.com/mdo.png"
                                    alt="hugenerd"
                                    width="30"
                                    height="30"
                                    class="rounded-circle"
                                />
                            </div>
                            <div className="username">
                                <span className="d-none d-sm-inline mx-1 text-white">Scarlett Johansson</span>
                            </div>
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-dark bg-color-baby-blue-2"
                            aria-labelledby="dropdownUser1"
                        >
                            <li><a className="dropdown-item2" href="seeker-detail-page.html">Profile</a></li>
                            <li><a className="dropdown-signout" href="landing-page-to-shelter.html">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default SeekerHeader;
