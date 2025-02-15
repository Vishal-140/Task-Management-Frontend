import { Link } from "react-router";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">SignUp</Link>
        </nav>
    );
};

export default Navbar;
