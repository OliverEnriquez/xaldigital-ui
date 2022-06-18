import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
const Header = () => {
  return (
    <Navbar color="primary" dark expand="md" className="bg-gradient">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none"></NavbarBrand>
      </div>
    </Navbar>
  );
};

export default Header;
