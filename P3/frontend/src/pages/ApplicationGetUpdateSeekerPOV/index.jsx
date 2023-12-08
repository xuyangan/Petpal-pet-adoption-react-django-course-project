import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const ApplicationViewUpdateSeeker = () => {
    const [formData, setFormData] = useState({
        pet_name: "",
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

    const { id: application_id } = useParams();
    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchApplicationDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8000/applications/get/${application_id}/`, {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            });

            if (response.ok) {
            const applicationData = await response.json();
            setFormData(applicationData);
            } else {
            console.error("Failed to fetch application details");
            }
        } catch (error) {
            console.error("Error fetching application details", error);
        }
        };

        fetchApplicationDetails();
    }, [application_id, authToken]);

    const withdrawApplication = async () => {
        try {
          const response = await fetch(`http://localhost:8000/applications/update/${application_id}/seeker/`, {
            method: "PATCH",
            mode: "cors",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "withdrawn",
            }),
          });
    
          if (response.ok) {
            console.log("Application withdrawn successfully!");
            // Optionally, you can update the local state or redirect the user
          } else {
            console.error("Failed to withdraw application");
          }
        } catch (error) {
          console.error("Error withdrawing application", error);
        }
      };
    

    return (
        <div className="bg-color-baby-blue-3">
            <div className="min-vh-100 d-flex flex-column justify-content-between">
                <section className="container py-5">
                    <div className="mt-4">
                            <button
                            type="button"
                            className="btn btn-danger"
                            onClick={withdrawApplication}
                            >
                            Withdraw Application
                            </button>
                        </div>
                    <div className="header-line">
                        <h2 className="mb-4">Pet Adoption Application for:  {formData.pet_name} </h2>
                        <a href="fqa-page.html">Got a question? Check out our FQA page first!</a>
                    </div>
                    <form>
                        <fieldset disabled="disabled">
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
                                            readOnly
                                        />
                                        <span>Yes</span>
                                    </label>
                                    <label className="option">
                                        <input
                                            type="radio"
                                            name="all_agree"
                                            value="no"
                                            checked={formData.all_agree === 0}
                                            readOnly
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
                                            readOnly
                                        />
                                        <span>Yes</span>
                                    </label>
                                    <label className="option">
                                        <input
                                            type="radio"
                                            name="considerate"
                                            value="no"
                                            checked={formData.considerate === 0}
                                            readOnly
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
                                            readOnly
                                        />
                                        <span>Yes</span>
                                    </label>
                                    <label className="option">
                                        <input
                                            type="radio"
                                            name="medical"
                                            value="no"
                                            checked={formData.medical === 0}
                                            readOnly
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
                                    readOnly
                                />
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
                                    readOnly
                                />
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
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="petType" className="form-label">
                                    Your Age
                                </label>
                                <select
                                    className="form-select"
                                    id="age_range"
                                    name="age_range"
                                    value={formData.age_range}
                                    readOnly
                                >
                                    <option selected>Choose...</option>
                                    <option>18-25</option>
                                    <option>25-30</option>
                                    <option>30-40</option>
                                    <option>40-50</option>
                                    <option>50+</option>
                                </select>
                            </div>
                            <div className="option-section">
                                <p className="description">What is your living arrangement?</p>
                                <div className="options">
                                <select
                                    className="form-select"
                                    id="living_arrangement"
                                    name="living_arrangement"
                                    value={formData.living_arrangement}
                                    readOnly
                                >
                                    <option selected>Choose...</option>
                                    <option>Detached House</option>
                                    <option>25-30</option>
                                    <option>30-40</option>
                                    <option>40-50</option>
                                    <option>50+</option>
                                </select>
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
                                            readOnly
                                        />
                                        <span>Yes</span>
                                    </label>
                                    <label className="option">
                                        <input
                                            type="radio"
                                            name="have_applied"
                                            value="no"
                                            checked={formData.have_applied === 0}
                                            readOnly
                                        />
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>
                            <h6 className="mt-4">Address</h6>
                            <div className="mb-3">
                                <label htmlFor="street_address" className="form-label">
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="street_address"
                                    name="street_address"
                                    value={formData.street_address}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">
                                    City
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="province" className="form-label">
                                    Province
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="province"
                                    name="province"
                                    value={formData.province}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postalCode" className="form-label">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="postal_code"
                                    name="postal_code"
                                    value={formData.postal_code}
                                    readOnly
                                />
                            </div>
                        </fieldset>
                    </form>
                    <div className="mt-4">
                        <button
                        type="button"
                        className="btn btn-danger"
                        onClick={withdrawApplication}
                        >
                        Withdraw Application
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ApplicationViewUpdateSeeker;
