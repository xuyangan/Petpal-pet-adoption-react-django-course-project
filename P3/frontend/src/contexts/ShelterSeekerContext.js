import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { IdContext } from "./IdContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ShelterSeekerContext = createContext();

export const ShelterSeekerContextProvider = ({ children }) => {
    const { authToken } = useContext(AuthContext);
    const { id, setId } = useContext(IdContext); // this is the username
    const [loggedIn, setLoggedIn] = useState(false);
    const [isShelter, setIsShelter] = useState(false);
    const [isSeeker, setIsSeeker] = useState(false);
    const [shelterName, setShelterName] = useState("");
    const [fullName, setFullName] = useState("");
    const [profile_picture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        userType();
    }
    , [id, authToken]);
    
    const userType = async () => {
        console.log("Checking user type...");
        console.log("User ID:", id);
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/accounts/profile/shelter/' + id + '/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                setIsShelter(true);
                setIsSeeker(false);
                setShelterName(json["shelter_name"]);
                setLoggedIn(true);
                setFullName("");
                setProfilePicture(json["profile_picture"]);

                setIsLoading(false);
                console.log(shelterName);
                console.log(profile_picture);
                console.log(id);
                return; // Exit the function early as we found the user type
            }
        } catch (error) {
            console.log("Error checking shelter status:", error);
        }
    
        // If the function hasn't returned yet, check if the user is a seeker
        try {
            const response2 = await fetch('http://localhost:8000/accounts/profile/seeker/' + id + '/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            });
            const json2 = await response2.json();
            if (response2.ok) {
                setIsShelter(false);
                setIsSeeker(true);
                setShelterName("");
                setLoggedIn(true);
                setFullName(await json2["first_name"] + " " + await json2["last_name"]);
                setProfilePicture(json2["profile_picture"]);
            } else {
                // Handle the case where the user is neither a shelter nor a seeker
                setLoggedIn(false);
                setIsShelter(false);
                setIsSeeker(false);
                setShelterName("");
                setFullName("");
                throw new Error("User is neither a shelter nor a seeker");
            }
        } catch (error) {
            console.log("Error checking seeker status:", error);
            // Handle the error case
            setLoggedIn(false);
            setIsShelter(false);
            setIsSeeker(false);
            setShelterName("");
            setFullName("");
        }
        setIsLoading(false);
        console.log(id);
    };

    const profileURL = "http://localhost:8000" + profile_picture;
    

    return (
        <ShelterSeekerContext.Provider value={{ loggedIn, isShelter, isSeeker,
         shelterName, userType, profile_picture, profileURL, isLoading, fullName,
         setLoggedIn, setIsShelter, setIsSeeker }}>
            {children}
        </ShelterSeekerContext.Provider>
    );
}

export default ShelterSeekerContextProvider;