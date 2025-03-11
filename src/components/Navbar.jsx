import { useState } from "react";
import { Link } from "react-router";
import styles from "./Navbar.module.css";
import PropTypes from "prop-types";

const Navbar = ({ currUser, handleLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={styles.nav}>
            <span className={styles.user}>Hello, {currUser?.fullName}</span>
            
            {/* Hamburger Menu */}
            <div className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            <div className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/tasks" className={styles.link}>Tasks</Link>
                <Link to="/ask-ai" className={styles.link}>Ask AI</Link>
                <button className={styles.button} onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    currUser: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default Navbar;