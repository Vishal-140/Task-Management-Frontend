import { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();

    // Handle user registration
    const handleRegister = async (e) => {
        try {
            e.preventDefault();

            if (e.target.password.value !== e.target.confirmPassword.value) {
                alert("Password does not match!");
                return;
            }

            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/register", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    fullName,
                    otp: e.target.otp.value,
                    password: e.target.password.value,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });

            const respObj = await resp.json();
            if (respObj.status === "success") {
                navigate("/login");
            } else {
                alert(respObj.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    // Handle OTP sending
    const handleSendOtp = async (e) => {
        e.preventDefault();

        try {
            const userEmail = e.target.userEmail.value;
            const userFullName = e.target.fullName.value;

            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/otps`, {
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
        <div className={styles.container}>
            <h1>SignUp Page</h1>
            {isOtpSent ? (
                <form onSubmit={handleRegister} className={styles.form}>
                    <input type="text" value={email} readOnly className={styles.input} />
                    <input type="text" value={fullName} readOnly className={styles.input} />
                    <input type="text" placeholder="OTP" name="otp" required className={styles.input} />
                    <input type="password" placeholder="Password" name="password" required className={styles.input} />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" required className={styles.input} />
                    <button type="submit" className={styles.button}>Register</button>
                </form>
            ) : (
                <form onSubmit={handleSendOtp} className={styles.form}>
                    <input type="text" placeholder="Full Name" name="fullName" required className={styles.input} />
                    <input type="email" placeholder="Email" name="userEmail" required className={styles.input} />
                    <button type="submit" className={styles.button}>Send OTP</button>
                </form>
            )}
            <Link to="/login" className={styles.loginLink}>Login</Link>
        </div>
    );
};

export default SignUpPage;
