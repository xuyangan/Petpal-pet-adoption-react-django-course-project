import React from "react";

const FileUploadField = ({ label, id, onChange }) => {
  const handleFileChange = (e) => {
    // Create an array of files from the FileList object
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    onChange(chosenFiles);
  };

  return (
    <div className="pet-field">
      <label className="form-label text-color-light-black" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-control"
        type="file"
        id={id}
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
};


export default FileUploadField;