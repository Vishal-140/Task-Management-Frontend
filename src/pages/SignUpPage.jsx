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
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Create Account</h1>
                {isOtpSent ? (
                    <>
                        <form onSubmit={handleRegister} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email</label>
                                <input type="text" value={email} readOnly className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Full Name</label>
                                <input type="text" value={fullName} readOnly className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>OTP</label>
                                <input type="text" placeholder="Enter OTP" name="otp" required className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Password</label>
                                <input type="password" placeholder="Create password" name="password" required className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Confirm Password</label>
                                <input type="password" placeholder="Confirm password" name="confirmPassword" required className={styles.input} />
                            </div>
                            <button type="submit" className={styles.button}>Create Account</button>
                        </form>
                    </>
                ) : (
                    <>
                        <form onSubmit={handleSendOtp} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Full Name</label>
                                <input type="text" placeholder="Enter your full name" name="fullName" required className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email</label>
                                <input type="email" placeholder="Enter your email" name="userEmail" required className={styles.input} />
                            </div>
                            <button type="submit" className={styles.button}>Send OTP</button>
                        </form>
                    </>
                )}
                <Link to="/login" className={styles.loginLink}>Already have an account? <span>Login</span></Link>
            </div>
        </div>
    );
};

export default SignUpPage;
