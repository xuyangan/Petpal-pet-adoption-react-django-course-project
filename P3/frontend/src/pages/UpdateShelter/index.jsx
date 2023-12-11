import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IdContext } from "../../contexts/IdContext";
import { AuthContext } from "../../contexts/AuthContext";
import FileUploadField from '../../components/FormComponents/FileUploadField/file_upload_field';
import { useNavigate } from "react-router-dom";
import { ShelterSeekerContext } from "../../contexts/ShelterSeekerContext";

function UpdateShelter() {
    const [shelterName, setShelterName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [missionStatement, setMissionStatement] = useState("");
    const [profile, setProfile] = useState([]);
    const [profileUrl, setProfileUrl] = useState("");
    const navigate = useNavigate();
    const { id, setId } = useContext(IdContext);
    const { authToken, setAuthToken } = useContext(AuthContext);
    const {userType} = useContext(ShelterSeekerContext);


    useEffect(() => {
        async function fetchData() {
            const url = "http://localhost:8000/accounts/profile/shelter/" + id + "/";
            console.log(url);

            setProfileUrl("/profile/shelter/" + id)

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
                    setShelterName(await json["shelter_name"]);
                    setEmail(await json["email"]);
                    if (await json["phone_number"]) {
                        setPhone(await json["phone_number"]);
                    }
                    if (await json["location"]) {
                        setLocation(await json["location"]);
                    }
                    if (await json["mission_statement"]) {
                        setMissionStatement(await json["mission_statement"]);
                    }
                    // if (await json["profile_picture"]) {
                    //     setProfile(await json["profile_picture"]);
                    // }
                }

            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    
    const updateShelter = async (e) => {
        e.preventDefault();

        const formSubmission = new FormData();
        formSubmission.append("shelter_name", shelterName);
        formSubmission.append("email", email);
        if (password1 !== "" && password2 !== "" && password1 === password2) {
            formSubmission.append("password", password1);
        }
        formSubmission.append("phone_number", phone);
        formSubmission.append("location", location);
        formSubmission.append("mission_statement", missionStatement);
        profile.forEach((file) => {
            formSubmission.append("profile_picture", file);
        });

        const data = JSON.parse(JSON.stringify({}));

        if (shelterName === "") {
            console.log("empty");
        } else {
            data.shelter_name = shelterName;
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
        if (missionStatement === "") {
            console.log("empty")
        } else {
            data.mission_statement = missionStatement;
        }
        // if (profile === "") {
        //     console.log("empty")
        // } else {
        //     data.profile_picture = profile;
        // }
        console.log(data);

        try {
            const response = await fetch("http://localhost:8000/accounts/update/shelter/", {
                method: "PATCH",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                },
                body: formSubmission,
            })

            const json = await response.json();

            if (!response.ok) {
                console.log("there's an error");
            }
            if (response.ok) {
                console.log("it worked");
                setShelterName("");
                setEmail("");
                setPassword1("");
                setPassword2("");
                setPhone("");
                setLocation("");
                setMissionStatement("");
                setProfile("");
                userType();
            }
        } catch (error) {
            console.log(error);
        }
        
        navigate("/profile/shelter/" + id);
    }

    const handleUploadFiles = files => {
        //empty array to store uploaded files
        const uploaded = [];
        files.some((file) => {
          if (uploaded.findIndex((f) => f.name === file.name) === -1) {
            uploaded.push(file);
          }
        });
        setProfile(uploaded);
      };
    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        console.log(chosenFiles);
        handleUploadFiles(chosenFiles);
    };
    const validateField = (field, value) => {

        return ''; // No error
    };

    return (
        <body className="bg-color-gradient">
            <div className="main">
                <h1 className="display-1">PetPal</h1>
                <div className="form-bg rounded default-shadow">
                    <form onSubmit={updateShelter}>
                        <div className="form-group">
                            <label htmlFor="shelter-name-input">Shelter Name</label>
                            <input
                                value={shelterName}
                                onChange={(e) => setShelterName(e.target.value)}
                                type="text" className="form-control" id="shelter-name-input"
                                placeholder="Enter shelter name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shelter-email-input">Email Address</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" className="form-control" id="shelter-email-input"
                                aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shelter-password-input">Password</label>
                            <input
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                type="password" className="form-control" id="shelter-password-input"
                                placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shelter-password-retype-input">Retype Password</label>
                            <input
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                type="password" className="form-control" id="shelter-password-retype-input"
                                placeholder="Enter password again" />
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
                            <FileUploadField
                                label="Profile Picture"
                                id="file-upload"
                                onChange={handleUploadFiles}
                                validate={validateField}
                            /></div>
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

export default UpdateShelter;