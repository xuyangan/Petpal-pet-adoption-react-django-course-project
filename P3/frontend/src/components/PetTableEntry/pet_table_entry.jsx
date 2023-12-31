// TableRow.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PetListingsContext } from '../../contexts/PetListingsContext';

const PetTableEntry = ({ pet }) => {

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src={"http://localhost:8000" + pet.pet_images[0]} alt={pet.name} className="rounded-circle" style={{ width: '45px', height: '45px' }} />
          <div className="ms-3">
            <p className="fw-bold mb-1">{pet.name}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">{pet.breed}</p>
      </td>
      <td>
        <p className="fw-normal mb-1">{pet.status}</p>
      </td>
      <td>
        {/* Change the date format here*/}
        <p className="fw-normal mb-1">{pet.publication_date}</p>
      </td>
      <td>
      <div className="d-flex ">
        <Link to={`/pet_listings/information/${pet.id}/`} className="btn btn-link btn-rounded btn-sm fw-bold text-color-baby-blue">
            View
        </Link>
        <Link to={`/pet_listings/edit/${pet.id}`} className="btn btn-link btn-rounded btn-sm fw-bold text-color-baby-blue">
            Edit
        </Link>
        </div>
      </td>
    </tr>
  );
};

export default PetTableEntry;
