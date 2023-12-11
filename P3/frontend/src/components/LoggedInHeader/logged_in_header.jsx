import PetPalLink from '../Links/PetPalLink/pet_pal_link';
import NavLink from '../Links/NavLink/nav_link';
import Dropdown from '../Dropdown/dropdown';
import { ShelterSeekerContext } from '../../contexts/ShelterSeekerContext';
import { useContext, useEffect } from 'react';
import { IdContext } from '../../contexts/IdContext';
import './logged_in_header.css'
import { Link } from 'react-router-dom';

const LoggedInHeader = () => {
    const { id } = useContext(IdContext);
    const { userType, isShelter, setIsShelter, isSeeker, profileURL,
        shelterName, fullName, isLoading, setIsSeeker } = useContext(ShelterSeekerContext);

    useEffect(() => {
        userType();

    }, [id]);

    const NavLinks = () => {
        if (isShelter) {
            return (
                <>
                    <NavLink to="/applications/dashboard/shelter" label="Applications" />
                </>
            )
        }
        if (isSeeker) {
            return (
                <>
                    <NavLink to="/applications/dashboard/seeker" label="Applications" />
                    <NavLink to="/shelters" label="Shelters" />
                </>
            )
        }
        else {
            return (
                <>
                </>
            )

        }
    }

    const DropdownProfile = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        } else {
            if (isShelter) {
                return (
                    <>
                        <div className="dropdown align-items-center">
                            <a href="#"
                                className="d-flex align-items-center text-color-baby-blue text-decoration-none dropdown-toggle"
                                id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="profile-container">
                                    {/* If the image is a local asset, use imported image */}
                                    <img src={profileURL} alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                    {/* If the image is a local asset, use imported image */}
                                    {/* <img src={calicoImage} alt="hugenerd" width="30" height="30" className="rounded-circle" /> */}
                                </div>
                                <div className="username">
                                    <span className="d-none d-sm-inline mx-1 text-white">{`${shelterName}`}</span>
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark bg-color-baby-blue-2" aria-labelledby="dropdownUser1">
                                <li><div className="dropdown-signout" ><NavLink to={`/profile/shelter/${id}`} label="Profile" /></div></li>
                                <li><div className="dropdown-signout" ><NavLink to={`/shelter_management`} label="Listing Management" /></div></li>
                                <li><div className="dropdown-signout" ><NavLink to={`/profile/shelter/${id}`} label="Sign Out" /></div></li>
                            </ul>
                        </div>
                    </>
                )
            }
            if (isSeeker) {
                return (
                    <>
                        <div className="dropdown align-items-center">
                            <a href="#"
                                className="d-flex align-items-center text-color-baby-blue text-decoration-none dropdown-toggle"
                                id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="profile-container">
                                    {/* If the image is a local asset, use imported image */}
                                    <img src={profileURL} alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                    {/* If the image is a local asset, use imported image */}
                                    {/* <img src={calicoImage} alt="hugenerd" width="30" height="30" className="rounded-circle" /> */}
                                </div>
                                <div className="username">
                                    <span className="d-none d-sm-inline mx-1 text-white">{`${fullName}`}</span>
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark bg-color-baby-blue-2" aria-labelledby="dropdownUser1">
                                <li><div className="dropdown-signout" ><NavLink to={`profile/seeker/${id}`} label="Profile" /></div></li>
                                <li><div className="dropdown-signout" ><NavLink to={`profile/seeker/${id}`} label="Sign Out" /></div></li>
                            </ul>
                        </div>
                    </>
                )
            }
            else {
                return (
                    <>
                    </>
                )
            }
        }
    };

    const Notifications = () => {
        if (isShelter || isSeeker) {
            return (
                <Link className="inbox-btn" to="/notifications">
                    <svg viewBox="0 0 512 512" height="16" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                        ></path>
                    </svg>
                    {/* <span className="msg-count">99</span> */}
                </Link>
            );
        } else {
            return (
                <>
                </>
            )
        }
    };


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-color-baby-blue default-shadow" data-bs-theme="dark">
                <div className="container">
                    <PetPalLink redirect="/pet_listings/search" />
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
                            {NavLinks()}
                        </ul>
                        {Notifications()}
                        {DropdownProfile()}
                    </div>
                </div>
                {/* <Dropdown /> */}
            </nav>


        </div>
    );
}

export default LoggedInHeader;