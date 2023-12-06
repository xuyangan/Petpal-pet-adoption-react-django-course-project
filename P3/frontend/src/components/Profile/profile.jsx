

const Profile = ({name, image}) => {
    return (
        <div>
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
                            src={image}
                            alt="hugenerd"
                            width="30"
                            height="30"
                            class="rounded-circle"
                        />
                    </div>
                    <div className="username">
                        <span className="d-none d-sm-inline mx-1 text-white">{name}</span>
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
    );
};