import React from 'react';

// Import the components created earlier
import FileUploadField from '../../FormComponents/FileUploadField/file_upload_field';
import TextField from '../../FormComponents/TextField/text_field';
import TextAreaField from '../../FormComponents/TextAreaField/text_area_field';
import NumberField from '../../FormComponents/NumberField/number_field';
import RadioButtonGroup from '../../FormComponents/RadioButtonGroupField/radio_button_group_field';
import CheckboxGroup from '../../FormComponents/CheckboxGroupField/checkbox_group_field';
import ReadonlyField from '../../FormComponents/ReadonlyField/readonly_field';
import { useState } from 'react';

const PetCreationForm = () => {
  // Define the state variables and their setter functions
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    size: '',
    gender: '',
    status: 'available',
    colour: '',
    location: '',
    description: '',
    behaviour: '',
    requirements: '',
    medical_history: '',
    // Add other fields as needed
  });

  const [formErrors, setFormErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([])

  // Define the options for radio buttons and checkboxes
  const genderOptions = [
    { id: 'male', label: 'Male', value: 'male' },
    { id: 'female', label: 'Female', value: 'female' }
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
    { id: 'size-large', label: 'Large', value: 'large' }
  ];

  const handleChange = (field) => (value) => {
    if (field === 'age' && value.target.value < 0) return;
    setFormData({ ...formData, [field]: value.target.value });
  };

  const validateField = (field, value) => {
    if (!value) return `${field} is required`;
    if (field === 'images' && value.length === 0) {
      return 'At least one image is required';
    }
    // Add other file validation checks as needed

    return ''; // No error
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    console.log(chosenFiles);
    handleUploadFiles(chosenFiles);
  }

  const handleUploadFiles = files => {
    //empty array to store uploaded files
    const uploaded = [];
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });
    setUploadedFiles(uploaded);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the form data
    let errors = Object.keys(formData).map((field) => validateField(field, formData[field])).filter(error => error);
    
    if (uploadedFiles.length === 0) {
      errors.push('At least one image is required');
    }
  
    setFormErrors(errors);
    if (errors.length > 0) return;
  
    // Initialize FormData
    const formSubmission = new FormData();
  
    // Convert size to integer
    const sizeMapping = { small: 1, medium: 2, large: 3 };
    const sizeValue = sizeMapping[formData.size] || 0; // Default to 0 if size is not in mapping
  
    // Append form fields to FormData
    Object.keys(formData).forEach(key => {
      const value = key === 'size' ? sizeValue.toString() : formData[key];
      formSubmission.append(key, value);
    });
  
    // Convert age to integer and append
    formSubmission.append('age', parseInt(formData.age).toString());
  
    // Append files to FormData
    uploadedFiles.forEach((file, index) => {
      formSubmission.append(`image${index + 1}`, file, file.name);
    });
  
    // Log FormData for debugging (FormData objects can't be directly logged)
    for (let pair of formSubmission.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  };
  


  // ... rest of your component
  return (
    <div className="col-lg-10 col-md-9">
      <div className="col-lg-">
        <div className="card p-5">
          <h1>New Listing</h1>
          <form className="col-" nonvalidate onSubmit={handleSubmit}>

            <TextField
              label="Name"
              name="name"
              placeholder="Enter name"
              id="name"
              value={formData.name}
              onChange={handleChange('name')}
              validate={(value) => validateField('Name', value)}
            />
            <TextField
              label="Breed"
              name="breed"
              placeholder="Enter breed"
              id="breed"
              value={formData.breed}
              onChange={handleChange('breed')}
              validate={(value) => validateField('Breed', value)}
            />
            <NumberField label="Age"
              id="age"
              value={formData.age}
              onChange={handleChange('age')}
              validate={(value) => validateField('Age', value)}
            />
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
            <RadioButtonGroup
              label="Status"
              name="status"
              options={statusOptions}
              value={formData.status}
              onChange={handleChange('status')}
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
            <TextField
              label="Location"
              name="location"
              placeholder="Enter location"
              id="location"
              value={formData.location}
              onChange={handleChange('location')}
              validate={(value) => validateField('Location', value)}
            />
            <TextAreaField
              label="Description"
              name="description"
              rows="5"
              id="description"
              value={formData.description}
              onChange={handleChange('description')}
              validate={(value) => validateField('Description', value)}
            />
            <TextAreaField
              label="Behaviour"
              name="behaviour"
              rows="5"
              id="behaviour"
              value={formData.behaviour}
              onChange={handleChange('behaviour')}
              validate={(value) => validateField('Behaviour', value)}
            />
            <TextAreaField
              label="Requirements"
              name="requirements"
              rows="5"
              id="requirements"
              value={formData.requirements}
              onChange={handleChange('requirements')}
              validate={(value) => validateField('Requirements', value)}
            />
            <TextAreaField
              label="Medical History"
              name="medical_history"
              rows="5"
              id="medical_history"
              value={formData.medical_history}
              onChange={handleChange('medical_history')}
              validate={(value) => validateField('Medical History', value)}
            />
            <FileUploadField
              label="Upload Images"
              id="file-upload"
              onChange={handleUploadFiles}
              validate={validateField}
            /><div className="uploaded-files-list">
              {uploadedFiles.map(file => (
                <div>
                  {file.name}
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary">Create New Listing</button>
            {formErrors.length > 0 && (
              <div>
                {formErrors.map((error, index) => (
                  <div key={index} className="form-error-message">{error}</div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );



};




export default PetCreationForm;
