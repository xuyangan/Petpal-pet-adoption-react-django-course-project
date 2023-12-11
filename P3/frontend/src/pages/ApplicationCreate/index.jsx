import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const ApplicationCreate = () => {
  const [formData, setFormData] = useState({
    all_agree: 0,
    considerate: 0,
    medical: 0,
    full_name: "",
    email: "",
    phone_number: "",
    age_range: "",
    living_arrangement: "",
    have_applied: 0,
    street_address: "",
    city: "",
    province: "",
    postal_code: "",
  });

  const [formErrors, setFormErrors] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    age_range: "",
    living_arrangement: "",
    have_applied: "",
    street_address: "",
    city: "",
    province: "",
    postal_code: "",
  });

  const { application_id } = useParams();
  const { authToken } = useContext(AuthContext);
  const [petName, setPetName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/pet_listings/${application_id}`, {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const petData = await response.json();
          setPetName(petData.name);
        } else {
          console.error("Failed to fetch pet details");
        }
      } catch (error) {
        console.error("Error fetching pet details", error);
      }
    };

    fetchPetDetails();
  }, [application_id, authToken]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const numericValue = type === "radio" ? (value === "yes" ? 1 : 0) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? [...prevData[name], value] : numericValue,
    }));
  };

const validateForm = () => {
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (isRequiredField(key) && isFieldEmpty(value)) {
        errors[key] = `${key.replace('_', ' ')} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const isRequiredField = (fieldName) => {
    return !["considerate", "medical", "have_applied"].includes(fieldName);
  };
  
  const isFieldEmpty = (value) => {
    return value === "" || value === null || value === undefined;
  };
  

  const submitApplication = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/applications/create/${application_id}/`, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission
        window.alert("Application successfully submitted!");
        navigate('/applications/dashboard/seeker');
      } else {
        // Handle submission error
        console.error("Failed to submit application");
        window.alert("You have already submitted an application for this pet.");
        navigate('/applications/dashboard/seeker');
      }
    } catch (error) {
      console.error("Error submitting application", error);
    }
  };

  return (
    <div className="bg-color-baby-blue-3">
      <div className="min-vh-100 d-flex flex-column justify-content-between">
        <section className="container py-5">
          <div className="header-line">
            <h2 className="mb-4">Pet Adoption Application for: {petName}</h2>
            <p>Pet ID: {application_id}</p>
            <Link to="/applications/faq">Got a question? Check out our FAQ page first!</Link>
          </div>
          <form onSubmit={submitApplication}>
          <h5 className="mt-4">Pet Preferences</h5>
                        {/* <div className="mb-3">
                            <label htmlFor="petName" className="form-label">
                                Name of the pet that prompted you to apply*
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="petName"
                                value={formData.petName}
                                onChange={handleChange}
                            />
                        </div> */}
                        <h5>Adoption Checklist</h5>
                        <div className="option-section">
                            <p className="description">
                                All members of the household are in agreement about adopting a dog*
                            </p>
                            <div className="options">
                                <label className="option">
                                    <input
                                        type="radio"
                                        name="all_agree"
                                        value="yes"
                                        checked={formData.all_agree === 1}
                                        onChange={handleChange}
                                    />
                                    <span>Yes</span>
                                </label>
                                <label className="option">
                                    <input
                                        type="radio"
                                        name="all_agree"
                                        value="no"
                                        checked={formData.all_agree === 0}
                                        onChange={handleChange}
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                        <div className="option-section">
                            <p className="description">
                                You have thought about where the pet will go when you are away on a
                                trip or if the pet requires a pet daycare during the day*
                            </p>
                            <div className="options">
                                <label className="option">
                                    <input
                                        type="radio"
                                        name="considerate"
                                        value="yes"
                                        checked={formData.considerate === 1}
                                        onChange={handleChange}
                                    />
                                    <span>Yes</span>
                                </label>
                                <label className="option">
                                    <input
                                        type="radio"
                                        name="considerate"
                                        value="no"
                                        checked={formData.considerate === 0}
                                        onChange={handleChange}
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                        <div className="option-section">
                            <p className="description">
                                You have budgeted for regular vetting and medical emergencies*
                            </p>
                            <div className="options">
                                <label className="option">
                                    <input
                                        type="radio"
                                        name="medical"
                                        value="yes"
                                        checked={formData.medical === 1}
                                        onChange={handleChange}
                                    />
                                    <span>Yes</span>
                                </label>
                                <label className="option">
                                    <input
                                        type="radio"
                                        name="medical"
                                        value="no"
                                        checked={formData.medical === 0}
                                        onChange={handleChange}
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                        <h5>About You</h5>
                        <div className="mb-3">
                            <label htmlFor="full_name" className="form-label">
                                Full Name*
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="full_name"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                            />
                            {formErrors.full_name && <div className="text-danger">Full Name is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email Address*
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && <div className="text-danger">Email is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone_number" className="form-label">
                                Phone Number*
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone_number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                            />
                            {formErrors.phone_number && <div className="text-danger">Phone Number is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="petType" className="form-label">
                                Your Age*
                            </label>
                            <select
                                className="form-select"
                                id="age_range"
                                name="age_range"
                                value={formData.age_range}
                                onChange={handleChange}
                            >
                                <option selected>Choose...</option>
                                <option>18-25</option>
                                <option>25-30</option>
                                <option>30-40</option>
                                <option>40-50</option>
                                <option>50+</option>
                            </select>
                            {formErrors.age_range && <div className="text-danger">Your Age is Required</div>}
                        </div>
                        <div className="option-section">
                            <p className="description">What is your living arrangement?*</p>
                            <div className="options">
                            <select
                                className="form-select"
                                id="living_arrangement"
                                name="living_arrangement"
                                value={formData.living_arrangement}
                                onChange={handleChange}
                            >
                                <option selected>Choose...</option>
                                <option>Detached House</option>
                                <option>Townhouse</option>
                                <option>Apartment/Condo</option>
                                <option>With outdoor space (fenced)</option>
                                <option>With outdoor space (unfenced)</option>
                                <option>No outdoor space</option>
                                <option>I live alone</option>
                                <option>I share a space with roommates/family</option>
                                <option>I rent my home</option>
                                <option>I own my home</option>
                            </select>
                            {formErrors.living_arrangement && <div className="text-danger">Living Arrangement is required</div>}
                            </div>
                        </div>
                        <h6 className="mt-4">Tell Us About Yourself</h6>
                        <div className="option-section">
                            <p className="description">
                                Have you ever adopted or applied to adopt a pet from a shelter or
                                rescue?*
                            </p>
                            <div className="options">
                                <label className="option">
                                    <input
                                        type="radio"
                                        name="have_applied"
                                        value="yes"
                                        checked={formData.have_applied === 1}
                                        onChange={handleChange}
                                    />
                                    <span>Yes</span>
                                </label>
                                <label className="option">
                                    <input
                                        type="radio"
                                        name="have_applied"
                                        value="no"
                                        checked={formData.have_applied === 0}
                                        onChange={handleChange}
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                        <h6 className="mt-4">Address</h6>
                        <div className="mb-3">
                            <label htmlFor="street_address" className="form-label">
                                Street Address*
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="street_address"
                                name="street_address"
                                value={formData.street_address}
                                onChange={handleChange}
                            />
                            {formErrors.street_address && <div className="text-danger">Street Address is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">
                                City*
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                            {formErrors.city && <div className="text-danger">City is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="province" className="form-label">
                                Province*
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="province"
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                            />
                            {formErrors.province && <div className="text-danger">Province is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="postalCode" className="form-label">
                                Postal Code*
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="postal_code"
                                name="postal_code"
                                value={formData.postal_code}
                                onChange={handleChange}
                            />
                            {formErrors.postal_code && <div className="text-danger">Postal Code is required</div>}
                        </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-primary">
                Submit Application
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ApplicationCreate;
