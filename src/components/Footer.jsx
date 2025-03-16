import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Task Management Tool</h3>
                    <p>Organize, track, and manage your tasks efficiently</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li>Home</li>
                        <li>Todo Tasks</li>
                        <li>Done Tasks</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <ul>
                        <li>Email: support@taskmanagementtool.com</li>
                        <li>Phone: +1234567890</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Task Management Tool. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;