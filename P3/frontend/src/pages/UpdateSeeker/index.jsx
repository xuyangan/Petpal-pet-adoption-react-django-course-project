import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IdContext } from "../../contexts/IdContext";
import { AuthContext } from "../../contexts/AuthContext";

function UpdateSeeker() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [preferences, setPreferences] = useState("");
    const [profile, setProfile] = useState("");
    const [profileUrl, setProfileUrl] = useState("");

    const { id, setId } = useContext(IdContext);
    const { authToken, setAuthToken} = useContext(AuthContext);

    useEffect(() => {
        async function fetchData() {
            const url = "http://localhost:8000/accounts/profile/seeker/" + id + "/";
            console.log(url);

            setProfileUrl("/profile/seeker/" + id)

            try {
                const response = await fetch(url, {
                    method: "GET",
                    mode: "cors",
                    headers: { "Authorization": `Bearer ${authToken}`}
                })

                const json = await response.json();

                if (!response.ok) {
                    console.log("there's an error");
                }
                if (response.ok) {
                    console.log("it worked");
                    setFirstName(await json["first_name"]);
                    setLastName(await json["last_name"]);
                    setEmail(await json["email"]);
                    if (await json["phone_number"]) {
                        setPhone(await json["phone_number"]);
                    }
                    if (await json["location"]) {
                        setLocation(await json["location"]);
                    }
                    if (await json["preferences"]) {
                        setPreferences(await json["preferences"]);
                    }
                    if (await json["profile_picture"]) {
                        setProfile(await json["profile_picture"]);
                    }
                }

            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const updateSeeker = async (e) => {
        e.preventDefault();
        
        try {
            console.log("inside update seeker");
            const data = JSON.parse(JSON.stringify({}));
            if (firstName === "") {
                console.log("empty first name");
            } else {
                data.first_name = firstName;
            }
            if (lastName === "") {
                console.log("empty")
            } else {
                data.last_name = lastName;
            }
            if (email === "") {
                console.log("empty")
            } else {
                data.email = email;
            }
            if (password1 === "" && password2 === "") {
                console.log("empty")
            } else {
                data.password = password1;
            }
            if (phone === "") {
                console.log("empty")
            } else {
                data.phone_number = phone;
            }
            if (location === "") {
                console.log("empty")
            } else {
                data.location = location;
            }
            if (preferences === "") {
                console.log("empty")
            } else {
                data.preferences = preferences;
            }
            if (profile === "") {
                console.log("empty")
            } else {
                data.profile_picture = profile;
            }
            console.log(data);

            const response = await fetch("http://localhost:8000/accounts/update/seeker/", {
                method: "PATCH",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify(data),
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
                setPassword1("");
                setPassword2("");
                setPhone("");
                setLocation("");
                setPreferences("");
                setProfile("");
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <body className="bg-color-gradient">
            <div className="main">
                <h1 className="display-1">Update Profile</h1>
                <div className="form-bg rounded default-shadow">
                    <form onSubmit={updateSeeker}>
                        <div className="form-group">
                            <label htmlFor="seeker-first-name-input">First Name</label>
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text" className="form-control" id="seeker-first-name-input"
                                placeholder="Enter first name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-last-name-input">Last Name</label>
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                type="text" className="form-control" id="seeker-last-name-input"
                                placeholder="Enter last name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-email-input">Email Address</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" className="form-control" id="seeker-email-input"
                                aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-password-input">Password</label>
                            <input
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                type="password" className="form-control" id="seeker-password-input"
                                placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-password-retype-input">Retype Password</label>
                            <input
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                type="password" className="form-control" id="seeker-password-retype-input"
                                placeholder="Enter password again" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-phone-input">Phone</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="text" className="form-control" id="seeker-phone-input"
                                placeholder="Enter phone" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-location-input">Location</label>
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                type="text" className="form-control" id="seeker-location-input"
                                placeholder="Enter location" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-preferences-input">Preferences</label>
                            <input
                                value={preferences}
                                onChange={(e) => setPreferences(e.target.value)}
                                type="text" className="form-control" id="seeker-preferences-input"
                                placeholder="Enter preferences" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-profile-input">Profile Picture</label>
                            <input
                                value={profile}
                                onChange={(e) => setProfile(URL.createObjectURL(e.target.files[0]))}
                                type="file" className="form-control" id="seeker-profile-input" />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <Link to={profileUrl} className="link-primary">Back to profile</Link>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default UpdateSeeker;