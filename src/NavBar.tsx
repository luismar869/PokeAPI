import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none", alignItems: "center" }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/detalles">Detalles</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;