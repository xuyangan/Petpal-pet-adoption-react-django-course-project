import React, { useEffect, useState } from 'react';
import PetCreationForm from '../PetCreationForm/pet_creation_form';
import PetGallery from '../../components/CompoundComponents/PetGallery/pet_gallery';

const PetListings = () => {
    const [pets, setPets] = useState([]);
    const [loaded, setLoaded] = useState(false);
    

    return (
        <div className='container my-3'>
            <PetGallery />
        </div>
    )
}

export default PetListings;