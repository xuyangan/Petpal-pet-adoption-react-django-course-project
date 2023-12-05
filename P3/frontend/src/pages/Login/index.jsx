import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const getLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:8000/accounts/token", {
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

            const access = await json["access"];
            const refresh = await json["refresh"];

            if (!response.ok) {
                console.log("there's an error");
            }
            if (response.ok) {
                console.log("it worked");
                setUsername("");
                setPassword("");
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
                </div>
            </div>
        </body>
    )
}

export default Login;