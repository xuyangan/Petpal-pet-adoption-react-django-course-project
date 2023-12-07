// DataComponent.js
import React from 'react';

const DataComponent = ({ label, value }) => {
  return (
    <div className="media">
      <label>{label}</label>
      <p>{value}</p>
    </div>
  );
};

export default DataComponent;
