import React, { createContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const PetListingsContext = createContext();

export const PetListingsContextProvider = ({ children }) => {
    const [petListings, setPetListings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]); // error messages from the backend
    const [errorStatus, setErrorStatus] = useState(null);
    const { authToken } = React.useContext(AuthContext);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [petListing, setPetListing] = useState(null);
    const [wasSuccessful, setWasSuccessful] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]); // success messages from the backend
    const [filters, setFilters] = useState({
        shelter_name: "",
        breed: "",
        status: "",
        size: "",
        max_age: "",
        min_age: "",
        colour: "",
        gender: "",
        sort_by_age: "",
        sort_by_name: "",
        sort_by_size: "",
        sort_in_desc: ""
    });
    const [isFiltering, setIsFiltering] = useState(false);


    const formatSize = () => {
        const sizeMapping = { 1: 'small', 2: 'medium', 3: 'large' };
        if (filters.size !== "")
            filters.size = sizeMapping[filters.size];
    }

    const parseAge = () => {
        if (filters.min_age !== "")
            filters.min_age = parseInt(filters.min_age);
        if (filters.max_age !== "")
            filters.max_age = parseInt(filters.max_age);
    }
    const getAllPetListings = async (page = 1) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pet_listings/list/?page=' + page,
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                });

            if (response.ok) {
                const data = await response.json();
                setNextPage(data.next);
                setPreviousPage(data.previous);
                // the actual list of pet listings is under the "results" key
                setPetListings(data.results);
                // change the date
                setIsError(false);
            } else {
                setErrorStatus(response.status);
                setErrorMessage(response.statusText);
                setIsError(true);
            }

        } catch (err) {
            setErrorMessage(err.message);
            setIsError(true);
        }
        setIsLoading(false);
    };

    // Function to fetch all pet listings from the backend
    const getPetListings = async (page = 1) => {
        setIsLoading(true);
        try {
            formatSize();
            parseAge();
            const params = new URLSearchParams(filters);
            console.log(params.toString());
            const response = await fetch('http://localhost:8000/pet_listings/search/?page=' + page
                + '&' + params.toString(),
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                });

            if (response.ok) {
                const data = await response.json();
                setNextPage(data.next);
                setPreviousPage(data.previous);
                // the actual list of pet listings is under the "results" key
                setPetListings(data.results);
                // change the date
                setIsError(false);
            } else {
                setErrorStatus(response.status);
                setErrorMessage(response.statusText);
                setIsError(true);
            }

        } catch (err) {
            setErrorMessage(err.message);
            setIsError(true);
        }
        setIsLoading(false);
    };




    const createPetListing = async (formData) => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8000/pet_listings/", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${authToken}`
                },
                body: formData
            })
            const json = await response.json();
            // call getPetListings to update the petListings state
            getPetListings();

            if (response.ok) {
                setIsError(false);
                setWasSuccessful(true);
            } else {
                setErrorStatus(response.status);
                setErrorMessage(response.statusText);
                setIsError(true);
            }
        } catch (error) {
            setErrorMessage(error.message);
            setIsError(true);

        }
        setIsLoading(false);
    };

    const editPetListing = async (formData, id) => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8000/pet_listings/" + id + "/", {
                method: "PATCH",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${authToken}`
                },
                body: formData
            })
            const json = await response.json();
            // call getPetListings to update the petListings state
            getPetListings();
            if (response.ok) {
                setIsError(false);
                setWasSuccessful(true);
            } else {
                setErrorStatus(response.status);
                setErrorMessage(response.statusText);
                setIsError(true);
            }
        } catch (error) {
            setErrorMessage(error.message);
            setIsError(true);

        }
        setIsLoading(false);
    };

    const getPetListing = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pet_listings/' + id + '/',
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                });

            if (response.ok) {

                const data = await response.json();
                setPetListing(data);
                // the actual list of pet listings is under the "results" key
                setIsError(false);
            } else {
                setErrorStatus(response.status);
                setErrorMessage(response.statusText);
                setIsError(true);
            }
        } catch (err) {
            setErrorMessage(err.message);
            setIsError(true);
        }
        setIsLoading(false);
    };

    const deletePetListing = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pet_listings/' + id + '/',
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                });

            if (response.ok) {
                // the actual list of pet listings is under the "results" key
                setIsError(false);
            } else {
                setErrorStatus(response.status);
                setErrorMessage(response.statusText);
                setIsError(true);
            }
        } catch (err) {
            setErrorMessage(err.message);
            setIsError(true);
        }
        setIsLoading(false);
    }


    // Fetch pet listings on component mount
    useEffect(() => {
        getPetListings();
    }, []);

    return (
        <PetListingsContext.Provider value={{
            petListings, isLoading, getPetListings, createPetListing,
            getPetListing, petListing, editPetListing, nextPage, previousPage,
            errorStatus, setPetListing, setPetListings, errorMessage, isError,
            wasSuccessful, setWasSuccessful, successMessage, setSuccessMessage,
            filters, setFilters, isFiltering, setIsFiltering, formatSize, parseAge,
            getAllPetListings, deletePetListing
        }}>
            {children}
        </PetListingsContext.Provider>
    );
};

export default PetListingsContextProvider;