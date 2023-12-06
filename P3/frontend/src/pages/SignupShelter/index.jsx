import { useState } from "react";
import { Link } from "react-router-dom";

function SignupShelter() {
    const [shelterName, setShelterName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState();
    const [location, setLocation] = useState();
    const [missionStatement, setMissionStatement] = useState();
    const [profile, setProfile] = useState();

    const submitShelter = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/accounts/signup/shelter/", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    shelter_name: shelterName,
                    email: email,
                    username: username,
                    password: password1,
                    phone_number: phone,
                    location: location,
                    mission_statement: missionStatement,
                    profile_picture: profile,
                })
            })

            const json = await response.json();

            if (!response.ok) {
                console.log("there's an error");
            }
            if (response.ok) {
                console.log("it worked");
                setShelterName("");
                setEmail("");
                setUsername("");
                setPassword1("");
                setPassword2("");
                setPhone();
                setLocation();
                setMissionStatement();
                setProfile();
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <body className="bg-color-gradient">
            <div className="main">
                <h1 className="display-1">PetPal</h1>
                <div className="form-bg rounded default-shadow">
                    <form onSubmit={submitShelter}>
                        <div className="form-group">
                            <label htmlFor="shelter-name-input">Shelter Name</label>
                            <input
                                value={shelterName}
                                onChange={(e) => setShelterName(e.target.value)}
                                type="text" className="form-control" id="shelter-name-input"
                                placeholder="Enter shelter name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shelter-email-input">Email Address</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" className="form-control" id="shelter-email-input"
                                aria-describedby="emailHelp" placeholder="Enter email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shelter-username-input">Username</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text" className="form-control" id="shelter-username-input"
                                placeholder="Enter username" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shelter-password-input">Password</label>
                            <input
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                type="password" className="form-control" id="shelter-password-input"
                                placeholder="Enter password" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shelter-password-retype-input">Retype Password</label>
                            <input
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                type="password" className="form-control" id="shelter-password-retype-input"
                                placeholder="Enter password again" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shelter-phone-input">Phone</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="text" className="form-control" id="shelter-phone-input"
                                placeholder="Enter phone" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shelter-location-input">Location</label>
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                type="text" className="form-control" id="shelter-location-input"
                                placeholder="Enter location" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shelter-mission-input">Mission Statement</label>
                            <input
                                value={missionStatement}
                                onChange={(e) => setMissionStatement(e.target.value)}
                                type="text" className="form-control" id="shelter-mission-input"
                                placeholder="Enter mission statement" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shelter-profile-input">Profile Picture</label>
                            <input
                                value={profile}
                                onChange={(e) => setProfile(URL.createObjectURL(e.target.files[0]))}
                                type="file" className="form-control" id="shelter-profile-input" />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <Link to="/login" className="link-primary">Already have an account? Login</Link>
                    </div>
                    <div className="text-center">
                        <Link to="/signup/seeker" className="link-primary">Are you a pet seeker? Sign up here</Link>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default SignupShelter;