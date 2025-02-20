import { Link } from "react-router";
import styles from "./Navbar.module.css";
import PropTypes from "prop-types";

const Navbar = ({ currUser, handleLogout }) => {
    return (
        <nav className={styles.nav}>
            <span className={styles.user}>Hello, {currUser?.fullName}</span>
            <div className={styles.navLinks}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/tasks" className={styles.link}>Tasks</Link>
                <Link to="/login" className={styles.link}>Login</Link>
                <Link to="/sign-up" className={styles.link}>SignUp</Link>
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