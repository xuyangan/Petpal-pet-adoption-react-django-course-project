import PetPalLink from '../Links/PetPalLink/pet_pal_link';
import NavLink from '../Links/NavLink/nav_link';
import Dropdown from '../Dropdown/dropdown';
import { ShelterSeekerContext } from '../../contexts/ShelterSeekerContext';
import { useContext, useEffect } from 'react';
import { IdContext } from '../../contexts/IdContext';

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
                                <li><div className="dropdown-signout" ><NavLink to={`/profile/shelter/${id}`} label="Profile"/></div></li>
                                <li><div className="dropdown-signout" ><NavLink to={`/shelter_management`} label="Listing Management"/></div></li>
                                <li><div className="dropdown-signout" ><NavLink to={`/profile/shelter/${id}`} label="Sign Out"/></div></li>
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
                            <li><div className="dropdown-signout" ><NavLink to={`profile/seeker/${id}`} label="Profile"/></div></li>
                                <li><div className="dropdown-signout" ><NavLink to={`profile/seeker/${id}`} label="Sign Out"/></div></li>
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


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-color-baby-blue default-shadow" data-bs-theme="dark">
                <div className="container">
                    <PetPalLink redirect="/pet_listings/" />
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
                        {DropdownProfile()}
                    </div>
                </div>
                {/* <Dropdown /> */}
            </nav>


        </div>
    );
}

export default LoggedInHeader;