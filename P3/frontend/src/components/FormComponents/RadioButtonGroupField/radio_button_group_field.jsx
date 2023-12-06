import React from "react";

const RadioButtonGroup = ({ label, name, options, value, onChange }) => (
<div className="pet-field">
    <label className="pet-label">{label}</label>
    {options.map((option, index) => (
      <div className="form-check" key={index}>
        <input 
          className="form-check-input" 
          type="radio" 
          name={name} 
          id={option.id} 
          checked={value === option.value} // Check the radio button if it matches the current value
          onChange={onChange} // Use the onChange handler from the parent component
          value={option.value} // Assign the value for each option
        />
        <label className="form-check-label" htmlFor={option.id}>{option.label}</label>
      </div>
    ))}
  </div>
);

export default RadioButtonGroup;