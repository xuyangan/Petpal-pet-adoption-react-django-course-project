
const NavLink = ({ to, label }) => {
    return (
        <li className="nav-item">
            <a href={to} className="nav-link active" aria-current="page">
                {label}
            </a>
        </li>
    );
}

export default NavLink;