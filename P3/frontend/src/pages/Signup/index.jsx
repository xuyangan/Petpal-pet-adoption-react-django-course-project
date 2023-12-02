import './signup.css';
import { Link, useParams } from "react-router-dom";

const Signup = () => {
    return <>
        <div className="bg-color-gradient">
            <div className="main">
                <h1 className="display-1">PetPal</h1>
                <h3 className="text-secondary">
                    Are you a pet seeker or pet shelter?
                </h3>
                <div className="py-3">
                    <Link to="/signup/seeker" className="btn btn-primary">
                        Pet Seeker
                    </Link>
                </div>
                <div className="pb-3">
                    <Link to="/signup/shelter" className="btn btn-primary">
                        Pet Shelter
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default Signup;