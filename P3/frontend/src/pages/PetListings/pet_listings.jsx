import React, { useEffect, useState } from 'react';
import PetCreationForm from '../../components/CompoundComponents/CreationForm/creation_form';

const PetListings = () => {
    const [pets, setPets] = useState([]);
    const [loaded, setLoaded] = useState(false);
    

    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/pets")
    //         .then(res => {
    //             setPets(res.data);
    //             setLoaded(true);
    //         })
    //         .catch(err => console.log(err));
    // }, [])

    // const removeFromDom = petId => {
    //     setPets(pets.filter(pet => pet._id != petId));
    // }

    return (
        <div className='container'>
            <PetCreationForm />
            <hr/>
            <h1>These pets are looking for a good home</h1>

        </div>
    )
}

export default PetListings;