import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [timer, setTimer] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    // Timer effect
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // Toast effect
    useEffect(() => {
        let toastTimeout;
        if (showToast) {
            toastTimeout = setTimeout(() => {
                setShowToast(false);
            }, 5000);
        }
        return () => clearTimeout(toastTimeout);
    }, [showToast]);

    // Handle user registration
    const handleRegister = async (e) => {
        try {
            e.preventDefault();

            if (e.target.password.value !== e.target.confirmPassword.value) {
                setToastMessage("Password does not match!");
                setShowToast(true);
                return;
            }

            // Show loading toast
            setToastMessage("Creating account...");
            setShowToast(true);

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
                setToastMessage("Account created successfully!");
                setShowToast(true);
                // Short delay before redirecting
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                setToastMessage(respObj.message);
                setShowToast(true);
            }
        } catch (err) {
            setToastMessage(err.message);
            setShowToast(true);
        }
    };

    // Handle OTP sending
    const handleSendOtp = async (e) => {
        e.preventDefault();

        try {
            const userEmail = e.target.userEmail.value;
            const userFullName = e.target.fullName.value;

            // Show loading toast immediately
            setToastMessage("Sending OTP...");
            setShowToast(true);

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
                setTimer(30);
                setToastMessage("OTP sent successfully! Check your email.");
                setShowToast(true);
            } else {
                setToastMessage("Error: " + respObj.message);
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error in handleSendOtp ->", error.message);
            setToastMessage("Failed to send OTP. Please try again.");
            setShowToast(true);
        }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        try {
            // Show loading toast
            setToastMessage("Resending OTP...");
            setShowToast(true);

            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/otps`, {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const respObj = await resp.json();

            if (respObj.status === "success") {
                setTimer(30);
                setToastMessage("OTP resent successfully! Check your email.");
                setShowToast(true);
            } else {
                setToastMessage("Error: " + respObj.message);
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error in handleResendOtp ->", error.message);
            setToastMessage("Failed to resend OTP. Please try again.");
            setShowToast(true);
        }
    };

    return (
        <div className={styles.container}>
            {showToast && (
                <div className={styles.toast}>
                    <p>{toastMessage}</p>
                </div>
            )}
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
                            <div className={styles.resendOtp}>
                                {timer > 0 ? (
                                    <span>Resend OTP in {timer} seconds</span>
                                ) : (
                                    <button 
                                        type="button" 
                                        onClick={handleResendOtp} 
                                        className={styles.resendButton}
                                    >
                                        Resend OTP
                                    </button>
                                )}
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
                            <button 
                                type="submit" 
                                className={styles.button}
                                disabled={timer > 0}
                            >
                                {timer > 0 ? `Send OTP (${timer}s)` : "Send OTP"}
                            </button>
                        </form>
                    </>
                )}
                <Link to="/login" className={styles.loginLink}>Already have an account? <span>Login</span></Link>
            </div>
        </div>
    );
};

export default SignUpPage;