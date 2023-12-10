import React, { useContext } from 'react';
import { PetListingsContext } from '../../contexts/PetListingsContext';
import { Link, useParams } from 'react-router-dom';
import PetCard from '../../components/Cards/ImageCard/pet_card';
import ErrorStatusMessage from '../../components/ErrorStatusMessage/error_status_message';
import { useEffect } from 'react';
import { useState } from 'react';

const MorePetListings = () => {
    const { username } = useParams();
    const {
        petListings, setPetListings, getShelterPetListings, isLoading, isError, errorMessage,
        errorStatus, wasSuccessful, setIsError, setIsLoading, setErrorMessage,
        setErrorStatus, setWasSuccessful, filters, setIsFiltering, nextPage, previousPage,
    } = useContext(PetListingsContext);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        console.log("username", username);
        getShelterPetListings(username, currentPage);

    }, [currentPage])


    if (isLoading) {
        return (
            <ErrorStatusMessage
                errorStatus={""}
                errorMessage={"Loading ..."}
            />
        ); // Show loading state
    }

    if (isError || !petListings) {
        return (
            <ErrorStatusMessage
                errorStatus={errorStatus}
                errorMessage={errorMessage}
            />
        ); // Show error state
    }
    const handlePrevious = () => {
        if (previousPage) {
            console.log("previous page", currentPage - 1);
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (nextPage) {
            console.log("next page", currentPage + 1);
            setCurrentPage(currentPage + 1);
        }
    };


    return (
        <div className="container my-3">
            {/* <div className='d-flex flex-row text-start my-2'>
                <Link to={"/profile/seeker/" + username} className="btn mx-1 text-color-baby-blue btn-secondary bg-white">Back</Link>
            </div> */}
            <div className="card border-1 my-4 shadow p-2">
                {petListings.length === 0 && (<div className="alert alert-info bg-color-baby-blue-3 text-info" role="alert">
                    No pets found!
                </div>)}
                <div className="row align-items-center">
                    {petListings.length > 0 && (
                        petListings.map((petListing, idx) => (
                            <div className="col-xl-4">
                                <PetCard
                                    key={petListing.id} // Use the unique id of each listing as the key
                                    name={petListing.name}
                                    status={petListing.status} // Assuming status is a property of petListing
                                    imageSrc={"http://localhost:8000" + petListing.pet_images[0]} // Assuming image is a property of petListing
                                    detailLink={`/pet_listings/information/${petListing.id}`} // Assuming you want to create a link to the detail page for each pet listing
                                    width={300}
                                    height={300}
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className="d-flex justify-content-center mb-2 mt-5">
                    <button
                        className={`btn mx-1 text-color-baby-blue btn-secondary bg-white  ${previousPage ? '' : 'disabled'}`}
                        onClick={handlePrevious}
                    // disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <div className="btn mx-1 bg-white btn-secondary text-color-baby-blue">
                        {currentPage}
                    </div>
                    <button
                        className={`btn mx-1 text-color-baby-blue btn-secondary bg-white ${nextPage ? '' : 'disabled'}`}
                        onClick={handleNext}
                    // disabled={petListings.length === 0}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MorePetListings;

