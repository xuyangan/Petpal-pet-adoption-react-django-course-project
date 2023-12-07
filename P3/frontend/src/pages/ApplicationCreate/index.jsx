import React from "react";
import { Link } from "react-router-dom";
import '../../style.css'


const ApplicationCreate = () => {
    return (
        <div className="bg-color-baby-blue-3">
            <div className="min-vh-100 d-flex flex-column justify-content-between">

                {/* Application Form Section */}
                <section className="container py-5">
                    <div className="header-line">
                        <h2 className="mb-4">Pet Adoption Application</h2>
                        <Link to="faq">Got a question? Check out our FAQ page first!</Link>
                    </div>
                    <form>
                        <h5 className="mt-4">Pet Preferences</h5>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">
                                Name of the pet that prompted you to apply*
                            </label>
                            <fieldset disabled="disabled">
                                <input
                                    className="form-control"
                                    type="text"
                                    value="Nugget"
                                    readOnly
                                />
                            </fieldset>
                        </div>
                        <h5>Adoption Checklist</h5>
                        <div className="option-section">
                            <p className="description">
                                All members of the household are in agreement about adopting a dog*
                            </p>
                            <div className="options">
                                <label className="option">
                                    <input type="radio" name="household-agreement" value="yes" />
                                    <span>Yes</span>
                                </label>
                                <label className="option">
                                    <input type="radio" name="household-agreement" value="no" />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                        <div className="option-section">
                            <p className="description">
                                You have thought about where the pet will go when you are away
                                on a trip or if the pet requires a pet daycare during the day*
                            </p>
                            <div className="options">
                                <label className="option">
                                    <input type="radio" name="trip-planning" value="yes" />
                                    <span>Yes</span>
                                </label>
                                <label className="option">
                                    <input type="radio" name="trip-planning" value="no" />
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
                                    <input type="radio" name="budgeted" value="yes" />
                                    <span>Yes</span>
                                </label>
                                <label className="option">
                                    <input type="radio" name="budgeted" value="no" />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                        <h5>About You</h5>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">Full Name*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address*</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="johndoe@example.com"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone Number*</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                placeholder="(123) 456-7890"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="petType" className="form-label">Your Age</label>
                            <select className="form-select" id="petType">
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
                                {/* ... Your checkboxes here ... */}
                            </div>
                        </div>
                        <h6 className="mt-4">Tell Us About Yourself</h6>
                        <div className="option-section">
                            <p className="description">
                                Have you ever adopted or applied to adopt a pet from a shelter
                                or rescue?*
                            </p>
                            <div className="options">
                                <label className="option">
                                    <input
                                        type="radio"
                                        name="adopted-before"
                                        id="adopted-yes"
                                        value="yes"
                                    />
                                    <span>Yes</span>
                                </label>
                                <label className="option">
                                    <input type="radio" name="adopted-before" value="no" />
                                    <span>No</span>
                                </label>
                            </div>
                            <div className="textarea-container">
                                <label id="label-feedback" className="left-side" htmlFor="feedback">
                                    If yes, please elaborate on the experience with that
                                    organization. Was it a positive experience? What did you learn
                                    through this experience?
                                </label>
                                <textarea
                                    id="input-feedback"
                                    name="feedback"
                                    rows="4"
                                    cols="50"
                                ></textarea>
                            </div>
                        </div>

                        <h6 className="mt-4">Address</h6>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Street Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="123 Main St"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                placeholder="Toronto"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="province" className="form-label">Province</label>
                            <input
                                type="text"
                                className="form-control"
                                id="province"
                                placeholder="Ontario"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="postalCode" className="form-label">Postal Code</label>
                            <input
                                type="text"
                                className="form-control"
                                id="postalCode"
                                placeholder="A1B 2C3"
                            />
                        </div>

                        <div className="mt-4">
                            <a href="pet-adoption-error-page.html" className="btn btn-primary">
                                Submit Application
                            </a>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default ApplicationCreate
