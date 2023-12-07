import { useState, useEffect } from "react";
import PetCard from '../Cards/ImageCard/pet_card';

function PetDisplay({username}) {
    const [data, setData] = useState([])

    useEffect(() => {
        getDisplay();
    })

    const getDisplay = async() => {
        const url = "http://localhost:8000/pet_listings/"+ username + "/";
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {"Authorization": `Bearer ${authToken}`}
        })

        const json = await response.json();
        const result = await json["results"]
        const slicedResult = await result.slice(0, 3);
        setData(slicedResult);
    }

    function List() {
        const display = data.map((petListing) => (
            <div key={petListing.id}>
                <PetCard
                    key={petListing.id}
                    name={petListing.name}
                    status={petListing.status}
                    imageSrc={"http://localhost:8000" + petListing.pet_images[0]}
                    detailLink={`/pet_listings/${petListing.id}/`}
                    width={300}
                    height={300}
                />
            </div>
        )) 

        return (
            <div>
                {display}
            </div>
        )
    }

    return (
        <div className="card">
            <List />
        </div>
    )
}

export default PetDisplay;