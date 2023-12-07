import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { IdContext } from "../../contexts/IdContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { authToken, setAuthToken } = useContext(AuthContext);
    const { id, setId } = useContext(IdContext);

    const getLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:8000/accounts/token/", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })

            const json = await response.json();

            if (!response.ok) {
                console.log("there's an error");
            }
            if (response.ok) {
                console.log("it worked");
                setId(username)
                setUsername("");
                setPassword("");
                const access = await json["access"];
                // console.log(json);
                // console.log(json["access"]);
                // console.log(access);
                // console.log("login", authToken);
                setAuthToken(access);
            }

        } catch(error) {
            console.log(error);
        }
    }

    return (
        <body className="bg-color-gradient">
            <div className="main">
                <h1 className="display-1">PetPal</h1>
                <div className="form-bg rounded default-shadow">
                    <form onSubmit={getLogin}>
                        <div className="form-group">
                            <label htmlFor="username-login">Username</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text" className="form-control" id="username-login"
                                placeholder="Enter username" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-login">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" className="form-control" id="password-login"
                                placeholder="Enter password" required />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <Link to="/signup" className="link-primary">Don't have an account? Sign up</Link>
                    {/* <Link to="/profile/seeker/seeker1">temp profile</Link>
                    <Link to="/profile/shelter/shelter1">shelter</Link>
                    <Link to="/shelters">shelter list</Link> */}
                </div>
            </div>
        </body>
    )
}

export default Login;