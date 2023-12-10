import { useState, useEffect, useContext } from "react";
import PetCard from '../Cards/ImageCard/pet_card';
import { AuthContext } from "../../contexts/AuthContext";
import { ShelterSeekerContext } from "../../contexts/ShelterSeekerContext";
import { Link } from "react-router-dom";

function PetDisplay({ username }) {
    const [data, setData] = useState([])
    const { isShelter, isSeeker } = useContext(ShelterSeekerContext);
    const { authToken, setAuthToken } = useContext(AuthContext);

    useEffect(() => {
        getDisplay();
    }, [])

    

    const getDisplay = async () => {  
        const url = "http://localhost:8000/pet_listings/" + username + "/";
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { "Authorization": `Bearer ${authToken}` }
        })

        const json = await response.json();
        const result = await json["results"]
        console.log(json);
        console.log(result);
        // const slicedResult = await result.slice(0, 3);
        setData(result);
    }

    function List() {
        if (data === undefined || data.length === 0) {
            return (
                <div className="alert alert-info bg-color-baby-blue-3 text-info ">
                    No pets found
                </div>
            )
        }

        const display = data.map((petListing) => (
            <div key={petListing.id} className="col-xl-4">
                <PetCard
                    key={petListing.id}
                    name={petListing.name}
                    status={petListing.status}
                    imageSrc={"http://localhost:8000" + petListing.pet_images[0]}
                    detailLink={`/pet_listings/information/${petListing.id}/`}
                    width={300}
                    height={300}
                />
            </div>
        ))

        return (
            <div className="row align-items-center">
                {display}
            </div>
        )
    }

    return (
        <div className="card shadow p-2 d-flex flex-column justify-content-between" >
            <List />
            <div className="text-center mt-5 mb-3">
                <Link to={"/pet_listings/" + username} className="btn btn-outline-primary mx-2">
                    See More
                </Link>
                { isShelter && <Link to="/shelter_management" className="btn btn-outline-primary mx-2">
                    Manage Listings
                </Link>}
            </div>
        </div>
    )
}

export default PetDisplay;