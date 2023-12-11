import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom";

function DeleteButton({isSeeker}) {
    const {authToken, setAuthToken } = useContext(AuthContext);
    const navigate = useNavigate();

    async function deleteProfile({isSeeker}) {
        try {
            if (isSeeker) {
                const response = await fetch("http://localhost:8000/accounts/removal/seeker/", {
                    method: "DELETE",
                    mode: "cors",
                    headers: {"Authorization": `Bearer ${authToken}`}
                })
                // const json = await response.json();

                if (!response.ok) {
                    console.log("there's an error");
                }
                if (response.ok) {
                    console.log("it worked");
                    // console.log(json);
                    // console.log(json["access"]);
                    // console.log(access);
                    // console.log("login", authToken);
                    setAuthToken("");
                    return navigate("/");
                }

            } else {
                const response = await fetch("http://localhost:8000/accounts/removal/shelter/", {
                    method: "DELETE",
                    mode: "cors",
                    headers: {"Authorization": `Bearer ${authToken}`}
                })
                // const json = await response.json();

                if (!response.ok) {
                    console.log("there's an error");
                }
                if (response.ok) {
                    console.log("it worked");
                    // console.log(json);
                    // console.log(json["access"]);
                    // console.log(access);
                    // console.log("login", authToken);
                    setAuthToken("");
                    return navigate("/");
                }
            }
        } catch(error) {
            console.log(error);
        }
        return
    }

    return (
        <button onClick={() => deleteProfile({isSeeker})} className="btn btn-outline-primary"
        style={{"z-index": "1"}}>Delete Profile</button>
    )
}

export default DeleteButton;