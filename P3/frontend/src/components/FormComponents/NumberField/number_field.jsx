import React, { useState } from "react";

const NumberField = ({ label, id, value, onChange, validate }) => {
    const [error, setError] = useState('');
  
    const handleValidation = (e) => {
      const validationError = validate ? validate(e.target.value) : '';
      setError(validationError);
      onChange(e);
    };
  
    return (
      <div className="pet-field">
        <label className="pet-label" htmlFor={id}>{label}</label>
        <input 
          type="number" 
          id={id} 
          className="form-control pet-input" 
          value={value} 
          onChange={handleValidation} 
        />
        {error && <div className="error-message">{error}</div>}
      </div>
    );
  };
  
export default NumberField;
