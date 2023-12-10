import React from 'react';
import { Link } from "react-router-dom"

const NavbarBrand = ({ redirect }) => {
  return (
    <Link className="navbar-brand" to={redirect}>
      PetPal
    </Link>
  );
};

export default NavbarBrand;
