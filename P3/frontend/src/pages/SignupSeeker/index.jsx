import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function SignupSeeker() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState();
    const [location, setLocation] = useState();
    const [preferences, setPreferences] = useState();
    const [profile, setProfile] = useState();

    const submitSeeker = async (e) => {
        e.preventDefault();
        
        try {
            console.log("inside submit seeker");
            console.log(firstName, lastName, email, username, password1, phone, location, preferences, profile);
            const response = await fetch("http://localhost:8000/accounts/signup/seeker/", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    username: username,
                    password: password1,
                    phone_number: phone,
                    location: location,
                    preferences: preferences,
                    profile_picture: profile,
                })
            })
    
            const json = await response.json();
    
            if (!response.ok) {
                console.log("there's an error");
            }
            if (response.ok) {
                console.log("it worked");
                setFirstName("");
                setLastName("");
                setEmail("");
                setUsername("");
                setPassword1("");
                setPassword2("");
                setPhone();
                setLocation();
                setPreferences();
                setProfile();
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <body className="bg-color-gradient">
            <div className="main">
                <h1 className="display-1">PetPal</h1>
                <div className="form-bg rounded default-shadow">
                    <form onSubmit={submitSeeker}>
                        <div className="form-group">
                            <label htmlFor="seeker-first-name-input">First Name</label>
                            <input
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text" className="form-control" id="seeker-first-name-input"
                                placeholder="Enter first name" required="true" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-last-name-input">Last Name</label>
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                type="text" className="form-control" id="seeker-last-name-input"
                                placeholder="Enter last name" required="true" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-email-input">Email Address</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" className="form-control" id="seeker-email-input"
                                aria-describedby="emailHelp" placeholder="Enter email" required="true" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-username-input">Username</label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text" className="form-control" id="seeker-username-input"
                                placeholder="Enter username" required="true" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-password-input">Password</label>
                            <input
                                onChange={(e) => setPassword1(e.target.value)}
                                type="password" className="form-control" id="seeker-password-input"
                                placeholder="Enter password" required="true" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-password-retype-input">Retype Password</label>
                            <input
                                onChange={(e) => setPassword2(e.target.value)}
                                type="password" className="form-control" id="seeker-password-retype-input"
                                placeholder="Enter password again" required="true" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-phone-input">Phone</label>
                            <input
                                onChange={(e) => setPhone(e.target.value)}
                                type="text" className="form-control" id="seeker-phone-input"
                                placeholder="Enter phone" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-location-input">Location</label>
                            <input
                                onChange={(e) => setLocation(e.target.value)}
                                type="text" className="form-control" id="seeker-location-input"
                                placeholder="Enter location" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-preferences-input">Preferences</label>
                            <input
                                onChange={(e) => setPreferences(e.target.value)}
                                type="text" className="form-control" id="seeker-preferences-input"
                                placeholder="Enter preferences" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-profile-input">Profile Picture</label>
                            <input
                                onChange={(e) => setProfile(URL.createObjectURL(e.target.files[0]))}
                                type="file" className="form-control" id="seeker-profile-input" />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <Link to="/login" className="link-primary">Already have an account? Login</Link>
                    </div>
                    <div className="text-center">
                        <Link to="/signup/shelter" className="link-primary">Are you a pet shelter? Sign up here</Link>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default SignupSeeker;