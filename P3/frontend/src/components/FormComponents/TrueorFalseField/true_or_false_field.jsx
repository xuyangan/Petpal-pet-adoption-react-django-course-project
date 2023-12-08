import React, { useState } from 'react';

const TrueFalseInput = ({ label, onValueChange }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onValueChange(newValue); // Notify the parent component of the change
    };

    return (
        <div >
            <label>{label}:</label>
            <div className='d-flex flex-row'>
                <input
                    type="radio"
                    name="trueFalse"
                    value="true"
                    checked={value === 'true'}
                    onChange={handleChange}
                />
                <label>True</label>
                <div>    </div>
                <input
                    type="radio"
                    name="trueFalse"
                    value="false"
                    checked={value === 'false'}
                    onChange={handleChange}
                />
                <label>False</label>
            </div>
        </div>
    );
};

export default TrueFalseInput;
