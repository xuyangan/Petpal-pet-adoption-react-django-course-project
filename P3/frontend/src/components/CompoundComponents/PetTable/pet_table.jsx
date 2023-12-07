// TableComponent.js
import React, { useContext } from 'react';
import PetTableEntry from '../../PetTableEntry/pet_table_entry';
import { PetListingsContext } from '../../../contexts/PetListingsContext';
import ErrorMessage from '../../ErrorMessage/error_message';
import { useEffect } from 'react';

const PetTable = ({ status }) => {
    const { petListings, getPetListings, isLoading, error } = useContext(PetListingsContext);

    useEffect(() => {
        getPetListings(); // Fetch pet listings when the component mounts
    }, []); // Empty dependency array ensures this runs once on mount

    if (isLoading) {
        return (
            <ErrorMessage error={"Loading ..."} />
        ); // Show loading state

    }

    if (error) {
        return (
            <ErrorMessage error={error} />
        );
    }
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
                {/* Pagination and other components as needed */}
            </div>
        </div>
    );
};

export default PetTable;
