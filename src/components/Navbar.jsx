import { Link } from "react-router";
import "./Navbar.css";

const Navbar = ({ currUser, handleLogout }) => {
    return (
        <nav className="navbar">
            <span>Hello {currUser.fullName}</span>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/tasks" className="nav-link">Tasks</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">SignUp</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
