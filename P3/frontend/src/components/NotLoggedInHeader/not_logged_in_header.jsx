import PetPalLink from '../Links/PetPalLink/pet_pal_link';



const NotLoggedInHeader = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-color-baby-blue default-shadow" data-bs-theme="dark">
                <div className="container">
                    <PetPalLink redirect="/" />
                </div>
            </nav>
            

        </div>
    );
}

export default NotLoggedInHeader;