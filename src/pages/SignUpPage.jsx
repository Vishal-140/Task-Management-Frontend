import { useState } from "react";
import { Link } from "react-router";
import "./SignUpPage.css";

const SignUpPage = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        // registration logic here
        
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();

        try {
            const userEmail = e.target.userEmail.value;
            const userFullName = e.target.fullName.value;

            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/otps`, { // OTP end point
                method: "POST",
                body: JSON.stringify({ email: userEmail }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const respObj = await resp.json();

            if (respObj.status === "success") {
                setIsOtpSent(true);
                setFullName(userFullName);
                setEmail(userEmail);
            } else {
                alert("Error: " + respObj.message);
            }
        } catch (error) {
            console.error("Error in handleSendOtp ->", error.message);
            alert("Failed to send OTP. Please try again.");
        }
    };

    return (
        <div className="signup-container">
            {isOtpSent ? (
                <form onSubmit={handleRegister}>
                    <input type="text" value={email} readOnly />
                    <input type="text" value={fullName} readOnly />
                    <input type="text" placeholder="OTP" name="otp" required />
                    <input type="password" placeholder="Password" name="password" required />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" required />
                    <button type="submit">Register</button>
                </form>
            ) : (
                <form onSubmit={handleSendOtp}>
                    <input type="text" placeholder="Full Name" name="fullName" required />
                    <input type="email" placeholder="Email" name="userEmail" required />
                    <button type="submit">Send OTP</button>
                </form>
            )}
            <Link to="/login" className="login-link">Login</Link>
        </div>
    );
};

export default SignUpPage;