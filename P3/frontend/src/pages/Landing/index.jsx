import './landing.css';
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Landing = () => {
    const {setAuthToken} = useContext(AuthContext);

    useEffect (() => {
        setAuthToken("a");
    }, []);

    return <>
        <div className="bg-color-gradient">
            <div className="main">
                <h1 className="display-1">PetPal</h1>
                <h3 className="text-secondary font-italic">
                    <em> Change a Life: Adopt Today! </em>
                </h3>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/signup" className="link-primary"
                >Don't have an account? Sign up</Link>
            </div>
        </div>
    </>
}

export default Landing;