
import { PetListingsContext } from "../../contexts/PetListingsContext";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import DataComponent from "../../components/LabeledData/labeled_data";
import ErrorStatusMessage from "../../components/ErrorStatusMessage/error_status_message";
import { useNavigate } from "react-router-dom";
import { ShelterSeekerContext } from "../../contexts/ShelterSeekerContext";
import { Link } from "react-router-dom";

const PetInformation = ({ children }) => {
    // need id from url
    const { isShelter, isSeeker } = useContext(ShelterSeekerContext);

    const { petId } = useParams();
    const { petListing, getPetListing, isLoading, isError, errorStatus, errorMessage,
        deletePetListing } = useContext(PetListingsContext);

    const navigate = useNavigate();

    const handleDelete = () => {
        deletePetListing(petId);
        navigate('/shelter_management/');
    }

    const buttonOptions = () => {
        if (isShelter) {
            return (<><Link to="pet-adoption-page.html" className="btn mx-1 text-white btn-secondary  ">
                Check Applications
            </Link>
                <button onClick={handleDelete} className="btn btn-link btn-rounded btn-sm fw-bold text-color-baby-blue">
                    Delete
                </button></>
            )
        } else if (isSeeker && petListing.status === "available") {
            return (<Link 
                to={`/applications/${petId}`} 
                className="btn mx-1 text-white btn-secondary">
                Apply
            </Link>)
        } else if (isSeeker) {
            console.log(petListing.status);
            return (<>
            </>);
        }
    };


        useEffect(() => {
            getPetListing(petId); // Fetch pet listing when the component mounts
        }
            , []); // Empty dependency array ensures this runs once on mount

        if (isLoading) {
            return (
                <ErrorStatusMessage
                    errorStatus={""}
                    errorMessage={"Loading ..."}
                />
            ); // Show loading state

        }

        if (isError || !petListing || petListing == {}) {
            return (
                <ErrorStatusMessage
                    errorStatus={errorStatus}
                    errorMessage={errorMessage}
                />
            ); // Show error state
        }

        return (
            <div className="container my-3">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card p-5">
                            <section className="section about-section gray-bg" id="about">
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="dark-color">{petListing.name}</h3>
                                            <h6 className="theme-color lead">{petListing.shelter_name}</h6>
                                            <p>{petListing.description}</p>
                                        </div>
                                        <div className="col-lg-6 py-3">
                                            <div>
                                                <img
                                                    src={"http://localhost:8000" + petListing.pet_images[0]} // Replace with petListing.imageSrc or a placeholder
                                                    className="img-fluid"
                                                    alt={petListing.name} // Replace with petListing.name or a placeholder
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="about-text go-to">

                                                <div className="row about-list">
                                                    <div className="col-md-6">
                                                        <DataComponent label="Age" value={petListing.age} />
                                                        <DataComponent label="Gender" value={petListing.gender} />
                                                        <DataComponent label="Colour" value={petListing.colour} />
                                                        <DataComponent label="Breed" value={petListing.breed} />
                                                        {
                                                            petListing.size === 1 ? <DataComponent label="Size" value="Small" /> :
                                                                petListing.size === 2 ? <DataComponent label="Size" value="Medium" /> :
                                                                    petListing.size === 3 ? <DataComponent label="Size" value="Large" /> :
                                                                        <DataComponent label="Size" value="Unknown" />
                                                        }
                                                    </div>
                                                    <div className="col-md-6">
                                                        <DataComponent label="Behaviour" value={petListing.behaviour} />
                                                        <DataComponent label="Requirements" value={petListing.requirements} />
                                                        <DataComponent label="Mefdical History" value={petListing.medical_history} />
                                                        <DataComponent label="Location" value={petListing.location} />
                                                        <DataComponent label="Publication Date" value={petListing.publication_date} />
                                                        {/* ... more data components if needed */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {buttonOptions()}
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    export default PetInformation;