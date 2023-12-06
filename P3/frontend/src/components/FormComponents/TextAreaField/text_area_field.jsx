import React, { useState } from 'react';

const TextAreaField = ({ label, name, rows, id, value, onChange, validate }) => {
    const [error, setError] = useState('');
  
    const handleValidation = (e) => {
      const validationError = validate ? validate(e.target.value) : '';
      setError(validationError);

      onChange(e);
    };

  
    return (
      <div className="pet-field">
        <label className="pet-label" htmlFor={id}>{label}</label>
        <textarea 
          className="pet-input" 
          name={name} 
          rows={rows} 
          id={id} 
          value={value} 
          onChange={handleValidation}
        ></textarea>
        {error && <div className="form-error-message">{error}</div>}
      </div>
    );
  };
  
  export default TextAreaField;