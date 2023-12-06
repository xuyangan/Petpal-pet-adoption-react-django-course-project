import React, { useState } from 'react';

const TextField = ({ label, name, placeholder, id, value, onChange, validate }) => {
  const [error, setError] = useState('');

  const handleValidation = (e) => {
    // Perform validation if a validate function is provided
    const validationError = validate ? validate(e.target.value) : '';
    setError(validationError);

    // Call the onChange passed from the parent component
    onChange(e);
  };

  return (
    <div className="pet-field">
      <label className="pet-label" htmlFor={id}>{label}</label>
      <input
        className="pet-input"
        name={name}
        type="text"
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={handleValidation}
      />
      {error && <div className="form-error-message">{error}</div>}
    </div>
  );
};

export default TextField;