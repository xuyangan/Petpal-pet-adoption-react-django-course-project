import React, { useEffect, useState } from 'react';
import PetCreationForm from '../../components/CompoundComponents/CreationForm/creation_form';
import PetGallery from '../../components/CompoundComponents/PetGallery/pet_gallery';

const PetListings = () => {
    const [pets, setPets] = useState([]);
    const [loaded, setLoaded] = useState(false);
    

    return (
        <div className='container'>
            <PetGallery />
            <hr/>
            <h1>These pets are looking for a good home</h1>

        </div>
    )
}

export default PetListings;