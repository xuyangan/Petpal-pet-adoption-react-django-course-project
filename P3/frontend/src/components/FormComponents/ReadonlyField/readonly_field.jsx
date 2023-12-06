import React from "react";

const ReadonlyField = ({ label, value }) => (
    <div className="pet-field">
        <label className="pet-label">{label}</label>
        <fieldset disabled>
            <input className="form-control" type="text" value={value} readOnly />
        </fieldset>
    </div>
);


export default ReadonlyField;