import PetPalLink from '../Links/PetPalLink/pet_pal_link';
import NavLink from '../Links/NavLink/nav_link';
import Dropdown from '../Dropdown/dropdown';


const DefaultHeader = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-color-baby-blue default-shadow" data-bs-theme="dark">
                <div className="container">
                    <PetPalLink href="/" />
                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink to="/" label="Home" />
                            {/* <NavLink to="/applications" label="Applications" /> */}
                            {/* <NavLink to="/explore" label="Explore" /> */}
                        </ul>
                    </div>
                </div>
                {/* <Dropdown /> */}
            </nav>
            

        </div>
    );
}

export default DefaultHeader;