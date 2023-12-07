import React, { useContext, useEffect } from 'react';
import { PetListingsContext } from '../../../contexts/PetListingsContext';
import PetCard from '../../Cards/ImageCard/pet_card';
import ErrorMessage from '../../ErrorMessage/error_message';

const PetGallery = ({ children }) => {
    const { petListings, getPetListings, isLoading, error } = useContext(PetListingsContext);

    useEffect(() => {
        getPetListings(); // Fetch pet listings when the component mounts
        console.log(petListings);
    }, []); // Empty dependency array ensures this runs once on mount

    if (isLoading) {
        return (
            <ErrorMessage error={"Loading ..."} />
        ); // Show loading state

    }

    if (error) {
        return(
            <ErrorMessage error={error} />
        );
    }

    return (
        <div>
            <div className="card border-0 mb-4 shadow">
                <div className="row align-items-center">
                    {petListings.length > 0 ? (
                        petListings.map((petListing, idx) => (
                            <div className="col-xl-4">
                                <PetCard
                                    key={petListing.id} // Use the unique id of each listing as the key
                                    name={petListing.name}
                                    status={petListing.status} // Assuming status is a property of petListing
                                    imageSrc={"http://localhost:8000" + petListing.pet_images[0]} // Assuming image is a property of petListing
                                    detailLink={`/pet_listings/${petListing.id}/`} // Assuming you want to create a link to the detail page for each pet listing
                                    width={300}
                                    height={300}
                                />
                            </div>
                        ))
                    ) : (
                        <div>No pets found!</div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PetGallery;