import React, { useContext } from 'react';
import { PetListingsContext } from '../../contexts/PetListingsContext';
import { Link } from 'react-router-dom';
import PetCard from '../../components/Cards/ImageCard/pet_card';
import ErrorStatusMessage from '../../components/ErrorStatusMessage/error_status_message';
import { useEffect } from 'react';
import { useState } from 'react';
import TextField from '../../components/FormComponents/TextField/text_field';
import NumberField from '../../components/FormComponents/NumberField/number_field';
import RadioButtonGroup from '../../components/FormComponents/RadioButtonGroupField/radio_button_group_field';
import CheckboxGroup from '../../components/FormComponents/CheckboxGroupField/checkbox_group_field';

const SearchPage = () => {
    const {
        petListings, getPetListings, isLoading, isError, errorMessage,
        errorStatus, wasSuccessful, setIsError, setIsLoading, resetFilters,
        setErrorStatus, setWasSuccessful, filters, setIsFiltering, nextPage, previousPage,
    } = useContext(PetListingsContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        shelter_name: '',
        breed: '',
        status: 'available',
        size: '',
        max_age: '',
        min_age: '',
        colour: '',
        gender: '',
        sort_by_age: false,
        sort_by_name: false,
        sort_by_size: false,
        sort_in_desc: false
        // Add other fields as needed
    });


    // Define the options for radio buttons and checkboxes
    const genderOptions = [
        { id: 'male', label: 'Male', value: 'male' },
        { id: 'female', label: 'Female', value: 'female' },
    ];

    const statusOptions = [
        { id: 'available', label: 'Available', value: 'available' },
        { id: 'adopted', label: 'Adopted', value: 'adopted' },
        { id: 'pending', label: 'Pending', value: 'pending' },
        { id: 'withdrawn', label: 'Withdrawn', value: 'withdrawn' }
    ];

    const sizeOptions = [
        { id: 'size-small', label: 'Small', value: 'small' }, // The value should be 'small' instead of '1
        { id: 'size-medium', label: 'Medium', value: 'medium' },
        { id: 'size-large', label: 'Large', value: 'large' },
    ];

    const sort_options = [
        { id: 'sort_by_age', label: 'Age', value: 'sort_by_age' },
        { id: 'sort_by_name', label: 'Name', value: 'sort_by_name' },
        { id: 'sort_by_size', label: 'Size', value: 'sort_by_size' },
        { id: 'sort_in_desc', label: 'Descending', value: 'sort_in_desc' }
    ];

    useEffect(() => {
        resetFilters();
    }, []);

    useEffect(() => {
        getPetListings(currentPage); // Fetch pet listings when the component mounts
    }, [currentPage]);

    const handleCheckboxChange = (fieldName) => (event) => {
        setFormData(prevState => ({
            ...prevState,
            [fieldName]: event.target.checked
        }));
    };

    const handleChange = (field) => (value) => {
        setFormData({ ...formData, [field]: value.target.value });

    };

    const validateField = (field, value) => {
        return ''; // No error
    };

    if (isLoading) {
        return (
            <ErrorStatusMessage
                errorStatus={""}
                errorMessage={"Loading ..."}
            />
        ); // Show loading state
    }

    if (isError || !petListings) {
        return (
            <ErrorStatusMessage
                errorStatus={errorStatus}
                errorMessage={errorMessage}
            />
        ); // Show error state
    }
    const handlePrevious = () => {
        if (previousPage) {
            console.log("previous page", currentPage-1);
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (nextPage) {
            console.log("next page", currentPage+1);
            setCurrentPage(currentPage + 1);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const sizeMapping = { small: 1, medium: 2, large: 3 };
        let sizeValue = '';

        // Check if formData.size matches any key in sizeMapping
        if (formData.size in sizeMapping) {
            sizeValue = sizeMapping[formData.size];
        }


        // for every filter field, if it is not empty, add it to filters
        filters.shelter_name = formData.shelter_name;
        filters.breed = formData.breed;
        filters.status = formData.status;
        filters.size = sizeValue;
        filters.colour = formData.colour;
        filters.gender = formData.gender;
        if (formData.max_age) filters.max_age = parseInt(formData.max_age)
        if (formData.min_age) filters.min_age = parseInt(formData.min_age)
        filters.sort_by_age = formData.sort_by_age;
        filters.sort_by_name = formData.sort_by_name;
        filters.sort_by_size = formData.sort_by_size;
        filters.sort_in_desc = formData.sort_in_desc;

        setIsFiltering(true);
        setCurrentPage(1);
        getPetListings(currentPage);
        

    };


    return (
        <div className="container my-3">
            <div className="">
                <div className="card p-5 ">
                    <h1> Search PetListings</h1>
                    <form className="" nonvalidate encType="multipart/form-data" onSubmit={handleSubmit}>
                        <button type="submit" className="btn btn-primary">Search</button>
                        <div className='row'>
                            <div className='col-md-2'>
                                <TextField
                                    label="Shelter Name"
                                    name="shelter_name"
                                    placeholder="Enter shelter name"
                                    id="shelter_name"
                                    value={formData.shelter_name}
                                    onChange={handleChange('shelter_name')}
                                    validate={(value) => validateField('Bhelter_name', value)}
                                />
                            </div>
                            <div className='col-md-2'>
                                <TextField
                                    label="Breed"
                                    name="breed"
                                    placeholder="Enter breed"
                                    id="breed"
                                    value={formData.breed}
                                    onChange={handleChange('breed')}
                                    validate={(value) => validateField('Breed', value)}
                                />
                                <TextField
                                    label="Colour"
                                    name="colour"
                                    placeholder="Enter colour"
                                    id="colour"
                                    value={formData.colour}
                                    onChange={handleChange('colour')}
                                    validate={(value) => validateField('Colour', value)}
                                />
                            </div>
                            <div  className='col-md-2'>
                                <NumberField label="Min age"
                                    id="min_age"
                                    value={formData.min_age}
                                    onChange={handleChange('min_age')}
                                    validate={(value) => validateField('min_age', value)}
                                />
                                <NumberField label="Max Age"
                                    id="max_age"
                                    value={formData.max_age}
                                    onChange={handleChange('max_age')}
                                    validate={(value) => validateField('max_age', value)}
                                />
                            </div>
                            <div className='col-md-2'>
                            <RadioButtonGroup
                                label="Size"
                                name="size"
                                options={sizeOptions}
                                value={formData.size}
                                onChange={handleChange('size')}
                            />
                            <RadioButtonGroup
                                label="Gender"
                                name="gender"
                                options={genderOptions}
                                value={formData.gender}
                                onChange={handleChange('gender')}
                            />
                            </div>
                            <div className='col-md-2'>
                            <RadioButtonGroup
                                label="Status"
                                name="status"
                                options={statusOptions}
                                value={formData.status}
                                onChange={handleChange('status')}
                            />
                            </div>
                            <div className='col-md-2'>
                                <CheckboxGroup
                                    label="Sorting by:"
                                    options={sort_options.map(option => ({
                                        ...option,
                                        checked: formData[option.value],
                                        onChange: handleCheckboxChange(option.value)
                                    }))}
                                />
                            </div>
                            <div className="uploaded-files-list">
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <div className="card border-1 my-4 shadow p-2">
                        {petListings.length === 0 && (<div className="alert alert-info bg-color-baby-blue-3 text-info" role="alert">
                            No pets found!
                        </div>)}
                        <div className="row align-items-center">
                            {petListings.length > 0 && (
                                petListings.map((petListing, idx) => (
                                    <div className="col-xl-4">
                                        <PetCard
                                            key={petListing.id} // Use the unique id of each listing as the key
                                            name={petListing.name}
                                            status={petListing.status} // Assuming status is a property of petListing
                                            imageSrc={"http://localhost:8000" + petListing.pet_images[0]} // Assuming image is a property of petListing
                                            detailLink={`/pet_listings/information/${petListing.id}`} // Assuming you want to create a link to the detail page for each pet listing
                                            width={300}
                                            height={300}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="d-flex justify-content-center mb-2 mt-5">
                            <button
                                className={`btn mx-1 text-color-baby-blue btn-secondary bg-white  ${previousPage ? '' : 'disabled'}`}
                                onClick={handlePrevious}
                                // disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <div className="btn mx-1 bg-white btn-secondary text-color-baby-blue">
                                {currentPage}
                            </div>
                            <button
                                className={`btn mx-1 text-color-baby-blue btn-secondary bg-white ${nextPage ? '' : 'disabled'}`}
                                onClick={handleNext}
                                // disabled={petListings.length === 0}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;

