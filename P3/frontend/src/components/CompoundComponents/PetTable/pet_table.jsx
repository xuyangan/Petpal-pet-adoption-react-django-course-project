// TableComponent.js
import React, { useContext } from 'react';
import PetTableEntry from '../../PetTableEntry/pet_table_entry';
import { PetListingsContext } from '../../../contexts/PetListingsContext';
import ErrorMessage from '../../ErrorMessage/error_message';
import { useEffect } from 'react';
import { useState } from 'react';

const PetTable = () => {
    const { petListings, getPetListings, nextPage, previousPage } = useContext(PetListingsContext);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        console.log(currentPage);   
        getPetListings(currentPage); // Fetch pet listings when the component mounts
    }, [currentPage]); 

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

    return (
        <div className="col-lg-10 col-md-9 border-0">
            <div className="table-responsive rounded min-vh-100 d-flex flex-column bg-light shadow justify-content-between">
                <table className="table w-100">
                    <thead>
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
                            <div>No pets found!</div>
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
    );
};

export default PetTable;
