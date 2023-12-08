import React from 'react';

const CheckboxGroup = ({ label, options }) => (
    <div className="pet-field">
        <label className="pet-label">{label}</label>
        {options.map((option, index) => (
            <div className="form-check" key={index}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={option.id}
                    checked={option.checked}
                    onChange={option.onChange} // Handle change event
                />
                <label className="form-check-label" htmlFor={option.id}>
                    {option.label}
                </label>
            </div>
        ))}
    </div>
);

export default CheckboxGroup;