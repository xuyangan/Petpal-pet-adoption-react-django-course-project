import React, { createContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const PetListingsContext = createContext();

export const PetListingsContextProvider = ({ children }) => {
    const [petListings, setPetListings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { authToken } = React.useContext(AuthContext);
    const [data, setData] = useState(null);
    const [petListing, setPetListing] = useState(null);


    // Function to fetch all pet listings from the backend
    const getPetListings = async (page=1) => {
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

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            setData(data);
            // the actual list of pet listings is under the "results" key
            setPetListings(data.results);
            setError(null);
        } catch (err) {
            setError(err.message);
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
            if (!response.ok) {
                console.log("There's an error");
            } else {
                console.log("It worked");
            }
            setError(null);
        } catch (error) {
            setError(error.message);
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

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            setPetListing(data);
            // the actual list of pet listings is under the "results" key
            setError(null);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    };
        

    // Fetch pet listings on component mount
    useEffect(() => {
        getPetListings();
    }, []);

    return (
        <PetListingsContext.Provider value={{ petListings, isLoading, error, getPetListings, createPetListing,
        getPetListing, petListing }}>
            {children}
        </PetListingsContext.Provider>
    );
};

export default PetListingsContextProvider;