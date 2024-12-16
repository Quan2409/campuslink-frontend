import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav>
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Users
            </NavLink>

            <NavLink
              to="/photos"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Photos
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
