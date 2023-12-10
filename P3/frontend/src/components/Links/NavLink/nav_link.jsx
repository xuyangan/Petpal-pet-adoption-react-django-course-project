import { Link } from 'react-router-dom';

const NavLink = ({ to, label }) => {
    return (
        <li className="nav-item">
            <Link to={to} className="nav-link active" aria-current="page">
                {label}
            </Link>
        </li>
    );
}

export default NavLink;