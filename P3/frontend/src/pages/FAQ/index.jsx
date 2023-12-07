import React from "react";
import '../../style.css';

const FAQ = () => {
    return (
        <div className="container my-3">
            <h1 className="text-center mb-5">Pet Adoption FAQ</h1>

            {/* FAQ Section */}
            <div className="accordion" id="adoptionFAQ">

                {/* Question 1 */}
                <div className="fqa-card card bg-color-baby-blue default-shadow">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-left text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                What is the pet adoption process?
                            </button>
                        </h2>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#adoptionFAQ">
                        <div className="card-body">
                            The pet adoption process with Pet Pal involves filling out an application, and waiting for the shelter to reach out for an interview. Once approved, there's a waiting period before you can take your new baby home.
                        </div>
                    </div>
                </div>

                {/* Question 2 */}
                <div className="fqa-card card bg-color-baby-blue default-shadow mt-3">
                    <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-left text-white collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                How much are the adoption fees?
                            </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#adoptionFAQ">
                        <div className="card-body">
                            Adoption fees are set by the shelter and vary based on the type and age of the pet. The listing fee includes vaccinations, microchipping, and spaying/neutering.
                        </div>
                    </div>
                </div>

                {/* Question 3 */}
                <div className="fqa-card card bg-color-baby-blue default-shadow mt-3">
                    <div className="card-header" id="headingThree">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-left text-white collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                What are the requirements for adopting a pet?
                            </button>
                        </h2>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#adoptionFAQ">
                        <div className="card-body">
                            Adopters must be at least 18 years old with a valid ID. We also require proof of residence. A home visit for certain pets can be expected.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FAQ;
