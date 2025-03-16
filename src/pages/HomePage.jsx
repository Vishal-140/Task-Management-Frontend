import Navbar from "../components/Navbar";
import { Link } from "react-router";
import "./HomePage.css";
import PropTypes from 'prop-types';
import Footer from "../components/Footer";

const HomePage = ({ currUser, handleLogout }) => {
    return (
        <div className="home-page">
            <Navbar currUser={currUser} handleLogout={handleLogout} />
            
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Streamline Your Tasks,<br />Boost Productivity with Task Management Tool</h1>
                    <p>The smart way to manage tasks, collaborate with teams, and achieve more together.</p>
                    <div className="hero-buttons">
                        <Link to="/tasks" className="create-task-btn">Get Started</Link>
                        <Link to="/ask-ai" className="ai-assist-btn">Try AI Assistant</Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Available Support</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Secure</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">Free</span>
                            <span className="stat-label">To Get Started</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <h2>Why Choose Our Platform?</h2>
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

            <div className="workflow-section">
                <h2>How It Works</h2>
                <div className="workflow-steps">
                    <div className="workflow-step">
                        <div className="step-number">1</div>
                        <h3>Create Tasks</h3>
                        <p>Easily create and organize your tasks with priorities and deadlines</p>
                    </div>
                    <div className="workflow-step">
                        <div className="step-number">2</div>
                        <h3>Assign & Collaborate</h3>
                        <p>Share tasks with team members and track progress together</p>
                    </div>
                    <div className="workflow-step">
                        <div className="step-number">3</div>
                        <h3>Complete & Review</h3>
                        <p>Mark tasks as done and analyze your team's performance</p>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <h2>Ready to Get Started?</h2>
                <p>Join thousands of teams already using our platform</p>
                <Link to="/tasks" className="create-task-btn">Start Managing Tasks</Link>
            </div>

            <Footer />
        </div>
    );
};

const features = [
    { 
        icon: "📊", 
        title: "Smart Dashboard", 
        description: "Get a comprehensive overview of all your tasks with our intuitive dashboard and real-time progress tracking." 
    },
    { 
        icon: "🎯", 
        title: "Priority Management", 
        description: "Never miss deadlines with our advanced priority system, custom labels, and automated reminders." 
    },
    { 
        icon: "🤖", 
        title: "AI Assistant", 
        description: "Leverage our AI-powered assistant for task suggestions, workflow optimization, and automated routine tasks." 
    },
    {
        icon: "📱",
        title: "Cross-Platform Access",
        description: "Access your tasks anytime, anywhere with our responsive platform that works on all devices."
    },
    {
        icon: "🔒",
        title: "Secure & Reliable",
        description: "Your data is protected with enterprise-grade security and regular backups for peace of mind."
    },
    {
        icon: "🔄",
        title: "Custom Workflows",
        description: "Create personalized workflows that match your team's unique processes and requirements."
    }
];

HomePage.propTypes = {
    currUser: PropTypes.object,
    handleLogout: PropTypes.func.isRequired,
};

export default HomePage;