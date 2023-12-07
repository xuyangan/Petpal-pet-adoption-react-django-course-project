import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext";
import ShelterCard from "../../components/ShelterList/shelter_card";

function ShelterList() {
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");
    const [data, setData] = useState([]);

    const { authToken, setAuthToken } = useContext(AuthContext);

    function List() {
        console.log(data);
        const shelter_list = data.map((shelter) =>
        <div key={shelter.username}>
            <ShelterCard
                username={shelter.username}
                shelterName={shelter.shelter_name}
                email={shelter.email}
                phone={shelter.phone_number}
                location={shelter.location}
                missionStatement={shelter.mission_statement}
            />
        </div>
        );
        return (
            <div>
                {shelter_list}
            </div>
        )
    }

    const getShelterListings = async ({url}) => {
        console.log("inside get shelter listings")
        console.log(url);
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { "Authorization": `Bearer ${authToken}`},
        })

        const json = await response.json();

        console.log(await json);

        if (!response.ok) {
            console.log("there's an error");
        }
        if (response.ok) {
            console.log("it worked");
            if (await json["next"]) {
                console.log(await json["next"])
                setNextUrl(await json["next"]);
            }
            if (await json["previous"]) {
                console.log(await json["previous"]);
                setPrevUrl(await json["previous"]);
            }
            const result = await json["results"];

            setData(await result);
        }
    }

    const getBackShelterListings = async () => {
        console.log("inside get shelter listings")
        console.log(prevUrl);
        const response = await fetch(prevUrl, {
            method: "GET",
            mode: "cors",
            headers: { "Authorization": `Bearer ${authToken}`},
        })

        const json = await response.json();

        console.log(await json);

        if (!response.ok) {
            console.log("there's an error");
        }
        if (response.ok) {
            console.log("it worked");
            if (await json["next"]) {
                console.log(await json["next"])
                setNextUrl(await json["next"]);
            }
            if (await json["previous"]) {
                console.log(await json["previous"]);
                setPrevUrl(await json["previous"]);
            }
            const result = await json["results"];

            setData(await result);
        }
    }

    const getNextShelterListings = async () => {
        console.log("inside get shelter listings")
        console.log(nextUrl);
        const response = await fetch(nextUrl, {
            method: "GET",
            mode: "cors",
            headers: { "Authorization": `Bearer ${authToken}`},
        })

        const json = await response.json();

        console.log(await json);

        if (!response.ok) {
            console.log("there's an error");
        }
        if (response.ok) {
            console.log("it worked");
            if (await json["next"]) {
                console.log(await json["next"])
                setNextUrl(await json["next"]);
            }
            if (await json["previous"]) {
                console.log(await json["previous"]);
                setPrevUrl(await json["previous"]);
            }
            const result = await json["results"];

            setData(await result);
        }
    }

    useEffect(() => {
        const url = "http://localhost:8000/accounts/list/shelter/"
        console.log("use effect", url)
        getShelterListings({url})
        console.log("done shelter listing")
    }, [])

    return (
        <div className="bg-color-baby-blue-3">
            <div className="vstack gap-3">
                <List />
                <div className="btn-toolbar" role="toolbar">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary" onClick={() => getBackShelterListings()}>Back</button>
                    </div>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary" onClick={() => getNextShelterListings()}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShelterList;