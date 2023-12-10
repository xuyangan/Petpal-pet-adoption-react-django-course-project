import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const PetListingsContext = createContext();

export const PetListingsContextProvider = ({ children }) => {
    const [petListings, setPetListings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // const [errorMessage, setErrorMessage] = useState([]);

    const [errorStatus, setErrorStatus] = useState("");
    const { authToken } = useContext(AuthContext);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [petListing, setPetListing] = useState(null);
    const [wasSuccessful, setWasSuccessful] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); // success messages from the backend
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
            const json = await response.json();
            if (response.ok) {

                setNextPage(json.next);
                setPreviousPage(json.previous);
                setPetListings(json.results);
                setNotErrorAlert();

            } else {

                console.log(json);
                setErrorMessageAlert(response.status, response.statusText + ": " + json["detail"]);

            }

        } catch (err) {
            console.log("error");
            setErrorMessageAlert("", err.message);
        }
        setIsLoading(false);
    };

    // Function to fetch all pet listings from the backend
    const getPetListings = async (page = 1) => {
        setIsLoading(true);
        try {
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
            const json = await response.json();
            if (response.ok) {

                setNextPage(json.next);
                setPreviousPage(json.previous);
                setPetListings(json.results);
                setNotErrorAlert();

            } else {
                console.log(json);
                setErrorMessageAlert(response.status, response.statusText + ": " + json["detail"]);

            }

        } catch (err) {
            setErrorMessage(err.message);
            setIsError(true);
        }
        setIsLoading(false);
    };

    const getShelterPetListings = async (username, page = 1) => {
        try {
            const response = await fetch("http://localhost:8000/pet_listings/" + username + "/" + "?page=" + page,
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                });
            const json = await response.json();
            
            if (response.ok) {
                const results = await json["results"];
                setNextPage(json.next);
                setPreviousPage(json.previous);
                setPetListings(results);
                setNotErrorAlert();

            } else {
                console.log(json);
                setErrorMessageAlert(response.status, response.statusText + ": " + json["detail"]);

            }

        } catch (err) {
            setErrorMessage(err.message);
            setIsError(true);
        }
        setIsLoading(false);
    };

    const resetFilters = () => {
        setFilters({
            shelter_name: "",
            breed: "",
            status: "available",
            size: "",
            max_age: "",
            min_age: "",
            gender: "",
            colour: "",
            sort_by_age: "",
            sort_by_name: "",
            sort_by_size: "",
            sort_in_desc: ""
        });
    }

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
                setNotErrorAlert();
                setSuccessAlert("Successfully created pet listing!");
            } else {
                setErrorMessageAlert(response.status, response.statusText + ": " + json["detail"]);
            }
        } catch (error) {
            setErrorMessageAlert("", error.message);

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

                setNotErrorAlert();
                setSuccessAlert("Successfully updated pet listing!");

            } else {
                setErrorMessageAlert(response.status, response.statusText + ": " + json["detail"]);
            }
        } catch (error) {
            setErrorMessageAlert("", error.message);

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
            const json = await response.json();
            if (response.ok) {
                setPetListing(json);
                setNotErrorAlert();

            } else {
                setErrorMessageAlert(response.status, response.statusText + ": " + json["detail"]);
            }
        } catch (err) {
            setErrorMessageAlert("", err.message);
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
            const json = await response.json();

            if (response.ok) {
                // the actual list of pet listings is under the "results" key
                setNotErrorAlert();
                setSuccessAlert("Successfully deleted pet listing!");
            } else {
                setErrorMessageAlert(response.status, response.statusText + ": " + json["detail"]);
            }
        } catch (err) {
            setErrorMessageAlert("", err.message);
        }
        setIsLoading(false);
    };


    const setSuccessAlert = (message) => {
        setWasSuccessful(true);
        setSuccessMessage(message);
    }

    const setErrorMessageAlert = (status, message) => {
        setIsError(true);
        setErrorStatus(status);
        setErrorMessage(message);
    }

    const setNotErrorAlert = () => {
        setIsError(false);
        setErrorStatus("");
        setErrorMessage("");
    }
    // Fetch pet listings on component mount
    // useEffect(() => {
    //     getPetListings();
    // }, []);

    return (
        <PetListingsContext.Provider value={{
            petListings, isLoading, getPetListings, createPetListing,
            getPetListing, petListing, editPetListing, nextPage, previousPage,
            errorStatus, setPetListing, setPetListings, errorMessage, isError,
            wasSuccessful, setWasSuccessful, successMessage, setSuccessMessage,
            filters, setFilters, isFiltering, setIsFiltering, parseAge,
            getAllPetListings, deletePetListing, setSuccessAlert, getShelterPetListings,
            resetFilters
        }}>
            {children}
        </PetListingsContext.Provider>
    );
};

export default PetListingsContextProvider;