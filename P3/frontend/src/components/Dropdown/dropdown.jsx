

const Dropdown = () => {
    return (
        <div>
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
        </div>
    );
}

export default Dropdown;