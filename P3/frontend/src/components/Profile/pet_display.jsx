import { useState } from "react";

function PetDisplay({username}) {
    const [data, setData] = useState([])

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

    return (

    )
}