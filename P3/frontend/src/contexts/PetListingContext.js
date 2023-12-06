import React, { createContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const PetListingContext = createContext();

export const PetListingContextProvider = ({ children }) => {
    const [petListings, setPetListings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { authToken } = React.useContext(AuthContext);


    // Function to fetch all pet listings from the backend
    const getPetListings = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pet_listings/list/',
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
            setPetListings(data);
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

    // Fetch pet listings on component mount
    useEffect(() => {
        getPetListings();
    }, []);

    return (
        <PetListingContext.Provider value={{ petListings, isLoading, error, getPetListings, createPetListing }}>
            {children}
        </PetListingContext.Provider>
    );
};

export default PetListingContextProvider;