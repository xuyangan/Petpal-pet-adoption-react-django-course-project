import { useContext, useEffect } from "react";
import { IdContext } from "../../contexts/IdContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Profile from "../../components/Profile/profile_page";
import PetDisplay from "../../components/Profile/pet_display";
import CommentSection from "../CommentSection";
import ShelterAnalytics from "../ShelterAnalytics";
import MorePetListings from "../MorePetListings/more_pet_listings";

function ShelterProfile() {
    const [shelterName, setShelterName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [prefMission, setPrefMission] = useState("");
    const [profile, setProfile] = useState("");
    const [isSame, setIsSame] = useState(false);
    const [isSeeker, setIsSeeker] = useState(false);

    const { id, setId } = useContext(IdContext);
    const { username } = useParams();
    const { authToken, setAuthToken } = useContext(AuthContext);

    useEffect(() => {

        async function fetchData() {
            const url = "http://localhost:8000/accounts/profile/shelter/" + username + "/";
            console.log(url);

            try {
                const response = await fetch(url, {
                    method: "GET",
                    mode: "cors",
                    headers: { "Authorization": `Bearer ${authToken}` }
                })

                const json = await response.json();

                if (!response.ok) {
                    console.log("there's an error");
                }
                if (response.ok) {
                    console.log("it worked");
                    console.log(await json)
                    setShelterName(await json["shelter_name"]);
                    setEmail(await json["email"]);
                    if (await json["phone_number"]) {
                        setPhone(await json["phone_number"]);
                    }
                    if (await json["location"]) {
                        setLocation(await json["location"]);
                    }
                    if (await json["mission_statement"]) {
                        setPrefMission(await json["mission_statement"]);
                    }
                    if (await json["profile_picture"]) {
                        setProfile(await json["profile_picture"]);
                    }
                    if (id === username) {
                        setIsSame(true);
                    }
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, []);


    return (
        <div className="container py-3">
            <div className="bg-color-baby-blue-3">
                <div className=" d-flex flex-column justify-content-between">
                    <Profile
                        firstName={shelterName}
                        lastName={lastName}
                        email={email}
                        phone={phone}
                        location={location}
                        prefMission={prefMission}
                        profile={profile}
                        isSame={isSame}
                        isSeeker={isSeeker}
                    />
                </div>
                <ShelterAnalytics
                    sheltername={username}
                />
                <PetDisplay
                    username={username}
                />
                {/* <MorePetListings
                    username={username}
                /> */}
                <CommentSection
                    sheltername={username}
                />
            </div>
        </div>
    )
}

export default ShelterProfile;