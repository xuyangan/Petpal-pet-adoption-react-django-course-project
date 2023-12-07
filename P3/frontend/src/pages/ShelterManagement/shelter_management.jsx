
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router
import PetTableEntry from '../../components/PetTableEntry/pet_table_entry';
import { PetListingsContext } from '../../contexts/PetListingsContext';
import { useContext } from 'react';
import ProfilePicture from '../../components/ProfilePicture/profile_picture';


const ShelterManagement = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { petListings, getPetListings, nextPage, previousPage, wasSuccessful,
        setWasSuccessful, successMessage, filters, setIsFiltering, isFiltering,
        getAllPetListings, deletePetListing } = useContext(PetListingsContext);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        console.log(currentPage);
         // Fetch pet listings when the component mounts
        if (isFiltering) {
            getPetListings(currentPage);
        } else {
            getAllPetListings(currentPage);
        }
    }, [currentPage, isFiltering]);

    const handlePrevious = () => {
        if (previousPage) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (nextPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {

        //set timer to set success message to false
        setTimeout(() => {
            setWasSuccessful(false);
        }
            , 5000);

    }, []);
    const getActiveListings = () => {
        console.log("get active listings");
        filters.status = "available";
        setIsFiltering(true);
        setCurrentPage(1);
        getPetListings(currentPage);
    };

    const getPendingListings = () => {
        console.log("get pending listings");
        filters.status = "pending";
        setIsFiltering(true);
        setCurrentPage(1);
        getPetListings(currentPage);
    };

    const getWithdrawnListings = () => {
        console.log("get withdrawn listings");
        filters.status = "withdrawn";
        setIsFiltering(true);
        setCurrentPage(1);
        getPetListings(currentPage);
    };

    const getAdoptedListings = () => {
        console.log("get adopted listings");
        filters.status = "adopted";
        setIsFiltering(true);
        setCurrentPage(1);
        getPetListings(currentPage);
    };

    const getAllListings = () => {
        console.log("get all listings");
        filters.status = "";
        setIsFiltering(false);
        setCurrentPage(1);
        getPetListings(currentPage);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    }



    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-lg-2 col-md-3 bg mb-3">
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
                                    <Link to="/pet_listings/create/" className="btn-link text-color-baby-blue text-decoration-none px-0">
                                        <i className="fs-4 bi-house"></i> <span className="fs-5">Create Listing</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={getAllListings} className="btn btn-link text-color-baby-blue bold text-decoration-none px-0">
                                        <i className="fs-4 bi-house"></i> <span className="fs-5 bold">Listings</span>
                                    </button>
                                    <ul className="collapse show nav flex-column ms-3" id="submenu1" data-bs-parent="#menu">
                                        <li className="w-100 mb-2">
                                            <button onClick={getActiveListings} className="btn btn-link text-color-baby-blue text-decoration-none">
                                                <span>Active </span>
                                            </button>
                                        </li>
                                        <li className="w-100 mb-2">
                                            <button onClick={getPendingListings} className="btn btn-link text-color-baby-blue text-decoration-none">
                                                <span>Pending </span>
                                            </button>
                                        </li>
                                        <li className="w-100 mb-2">
                                            <button onClick={getWithdrawnListings} className="btn btn-link text-color-baby-blue text-decoration-none">
                                                <span>Withdraw </span>
                                            </button>
                                        </li>
                                        <li className="w-100 mb-2">
                                            <button onClick={getAdoptedListings} className="btn btn-link text-color-baby-blue text-decoration-none">
                                                <span>Adopted </span>
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <Link to="/shelter-detail-page" className="btn-link text-color-baby-blue bold text-decoration-none px-0">
                                <i className="fs-4 bi-house"></i> <span className="fs-auto">Back To Profile</span>
                            </Link>
                        </div>
                    </div>

                </div>
                <div className="col-lg-10 col-md-9 border-0">
                    {wasSuccessful ? (
                        <div className="alert alert-info bg-color-baby-blue-3 text-info" role="alert">
                            {successMessage}
                        </div>
                    ) : (
                        <div></div>
                    )
                    }
                    <div className="table-responsive rounded  d-flex flex-column bg-light shadow justify-content-between">

                        <table className="table w-100">
                            <thead>
                                <tr> </tr>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Dates</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {petListings.length > 0 ? (
                                    petListings.map((petListing, idx) => (
                                        <PetTableEntry
                                            pet={petListing}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5}>
                                            <div className="alert alert-info bg-color-baby-blue-3 text-info" role="alert">
                                                No pets found!
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* Pagination Controls */}
                        <div className="d-flex justify-content-center mb-2">
                            <button
                                className={`btn mx-1 text-color-baby-blue btn-secondary bg-white  ${previousPage ? '' : 'disabled'}`}
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <div className="btn mx-1 bg-white btn-secondary text-color-baby-blue">
                                {currentPage}
                            </div>
                            <button
                                className={`btn mx-1 text-color-baby-blue btn-secondary bg-white ${nextPage ? '' : 'disabled'}`}
                                onClick={handleNext}
                                disabled={petListings.length === 0}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShelterManagement;

