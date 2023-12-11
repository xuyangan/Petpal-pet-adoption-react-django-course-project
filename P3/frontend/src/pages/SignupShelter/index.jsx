import { useState } from "react";
import { Link } from "react-router-dom";
import FileUploadField from '../../components/FormComponents/FileUploadField/file_upload_field';


function SignupShelter() {
    const [shelterName, setShelterName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [missionStatement, setMissionStatement] = useState("");
    const [profile, setProfile] = useState([]);


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

    const validateShelterName = (value) => {
        return value.trim() === '' ? "Shelter Name cannot be empty." : null;}

    const validateEmail = (value) => {
        if(value.trim() === '') {
            return "Email cannot be empty."
        }else if (!(/\S+@\S+\.\S+/.test(value))){
            return "Invalid email." 
        }else{
            return null;
        }
    };

    const validateUserName = (value) => {
        return value.trim() === '' ? "Username cannot be empty." : null;
    };

    const validatePassword1 = (value) => {
        if(value.trim() === '') {
            return "Password cannot be empty."
        }else{
            if(!(value.length >= 8)){
                return "Invalid password."
            }
            return null;
        }
    };

    const validatePassword2 = (value) => {
        if(!(value===password1 && value.length >= 8)) {
            return "Passwords must match."
        }else{
            
            return null;
        }
    };
    
    const handleChange = (fieldName) => (event) => {
        const newValue = event.target.value;
    
        if (fieldName === 'shelterName') {
            setShelterName(newValue);
            const error = validateShelterName(newValue);
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: error
            }));
        }
        if (fieldName === 'username') {
            setUsername(newValue);
            const error = validateUserName(newValue);
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: error
            }));
        }
        if (fieldName === 'email') {
            setEmail(newValue);
            const error = validateEmail(newValue);
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: error
            }));
        }
        if (fieldName === 'password1') {
            setPassword1(newValue);
            const error = validatePassword1(newValue);
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: error
            }));
        }
        if (fieldName === 'password2') {
            setPassword2(newValue);
            const error = validatePassword2(newValue);
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: error
            }));
        }
    };

    const [errors, setErrors] = useState({
        shelterName: null,
        email: null,
        username: null,
        password1: null,
        password2: null,
    });

    const validateAllFields = () => {
        const errors = {
            shelterName: validateShelterName(shelterName),
            email: validateEmail(email),
            username: validateUserName(username),
            password1: validatePassword1(password1),
            password2: validatePassword2(password2),
        };
        return errors;
    };


    const submitShelter = async (e) => {
        e.preventDefault();

        const validationErrors = validateAllFields();
        setErrors(validationErrors);
    
        const hasErrors = Object.values(validationErrors).some(error => error != null);
        if (hasErrors) {
            console.log("Validation errors:", validationErrors);
            return;
        }

        const formSubmission = new FormData();
        formSubmission.append("shelter_name", shelterName);
        formSubmission.append("email", email);
        formSubmission.append("username", username);
        formSubmission.append("password", password1);
        formSubmission.append("phone_number", phone);
        formSubmission.append("location", location);
        formSubmission.append("mission_statement", missionStatement);
        profile.forEach((file) => {
            formSubmission.append("profile_picture", file);
        });



        try {
            const response = await fetch("http://localhost:8000/accounts/signupform/shelter/", {
                method: "POST",
                mode: "cors",
                headers: {
                },
                body: formSubmission
            })

            const json = await response.json();

            if (!response.ok) {
                console.log("there's an error");
                if (json["username"]) {
                    window.alert(response.status + " " + response.statusText + ": " + json["username"]);
                }
                window.alert(response.status + " " + response.statusText)
            }
            if (response.ok) {
                console.log("it worked");
                setShelterName("");
                setEmail("");
                setUsername("");
                setPassword1("");
                setPassword2("");
                setPhone("");
                setLocation("");
                setMissionStatement();
                setProfile([]);
                window.alert("Account created successfully! Please log in to continue.");
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
                    <form onSubmit={submitShelter} noValidate>
                        <div className="form-group">
                            <label htmlFor="shelter-name-input">Shelter Name *</label>
                            <input
                                value={shelterName}
                                onChange={handleChange('shelterName')}
                                type="text" className="form-control" id="shelter-name-input"
                                placeholder="Enter shelter name" required />
                                {errors.shelterName && <div className="error-message">{errors.shelterName}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-email-input">Email Address *</label>
                            <input
                                value={email}
                                onChange={handleChange('email')}
                                type="email" className="form-control" id="seeker-email-input"
                                aria-describedby="emailHelp" placeholder="Enter email" required />
                                {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-username-input">Username *</label>
                            <input
                                value={username}
                                onChange={handleChange('username')}
                                type="text" className="form-control" id="seeker-username-input"
                                placeholder="Enter username" required />
                            {errors.username && <div className="error-message">{errors.username}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-password-input">Password *</label>
                            <input
                                value={password1}
                                onChange={handleChange('password1')}
                                type="password" className="form-control" id="seeker-password-input"
                                placeholder="Enter password" required />
                                {errors.password1 && <div className="error-message">{errors.password1}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="seeker-password-retype-input">Retype Password *</label>
                            <input
                                value={password2}
                                onChange={handleChange('password2')}
                                type="password" className="form-control" id="seeker-password-retype-input"
                                placeholder="Enter password again" required />
                                {errors.password2 && <div className="error-message">{errors.password2}</div>}
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