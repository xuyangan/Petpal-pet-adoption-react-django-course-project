import ShelterSideBar from "../../components/ShelterSideBar/shelter_sidebar";
import PetTable from "../../components/CompoundComponents/PetTable/pet_table";

const ShelterManagement = () => {



    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-lg-2 col-md-3 bg mb-3">
                    <ShelterSideBar />
                    
                </div>
                <PetTable />
            </div>
        </div>
    );
}

export default ShelterManagement;

