import Navbar from "../components/Navbar";
import { Link } from "react-router";
import "./HomePage.css";
import PropTypes from 'prop-types';

const HomePage = ({ currUser, handleLogout }) => {
    return (
        <div className="home-page">
            <Navbar currUser={currUser} handleLogout={handleLogout} />
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Task Management Tool</h1>
                    <p>Your personal productivity dashboard</p>
                    <Link to="/tasks" className="create-task-btn">Create Your Task</Link>
                </div>
            </div>
            <div className="dashboard-container">
                <div className="features-section">
                    <h2>Features</h2>
                    <div className="features-grid">
                        {features.map(({ icon, title, description }) => (
                            <div className="feature-card" key={title}>
                                <div className="feature-icon">{icon}</div>
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <footer className="home-footer">
                <p>&copy; {new Date().getFullYear()} Task Management Tool. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Us</a>
                </div>
            </footer>
        </div>
    );
};

const features = [
    { icon: "📊", title: "Task Dashboard", description: "Get a quick overview of all your tasks and progress." },
    { icon: "🔔", title: "Priority Management", description: "Never miss important deadlines with our priority system." },
    { icon: "👥", title: "Team Collaboration", description: "Assign tasks to team members and track progress." }
];

HomePage.propTypes = {
    currUser: PropTypes.object,
    handleLogout: PropTypes.func.isRequired,
};

export default HomePage;