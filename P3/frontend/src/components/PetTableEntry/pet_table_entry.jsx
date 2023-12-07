// TableRow.js
import React from 'react';

const PetTableEntry = ({ pet }) => {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src={"http://localhost:8000" + pet.pet_images[0]} alt={pet.name} className="rounded-circle" style={{ width: '45px', height: '45px' }} />
          <div className="ms-3">
            <p className="fw-bold mb-1">{pet.name}</p>
            <p className="text-muted mb-0">{pet.age}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">{pet.breed}</p>
        <p className="text-muted mb-0">{pet.colour}</p>
      </td>
      <td>
        <p className="fw-normal mb-1">{pet.status}</p>
      </td>
      <td>
        <p className="fw-normal mb-1">{pet.publication_date}</p>
        <p className="text-muted mb-0">-</p>
      </td>
      <td>
        <a className="btn btn-link btn-rounded btn-sm fw-bold text-color-baby-blue">Edit</a>
      </td>
    </tr>
  );
};

export default PetTableEntry;
