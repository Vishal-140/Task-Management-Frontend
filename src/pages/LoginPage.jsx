import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./LoginPage.module.css";
import PropTypes from 'prop-types';

const LoginPage = ({ afterLogin }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

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

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // loading toast
            setToastMessage("Signing in...");
            setShowToast(true);

            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    email: e.target.email.value,
                    password: e.target.password.value,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });

            const respObj = await resp.json();
            console.log(resp);
            console.log(respObj);
            
            if (respObj.status === "success") {
                setToastMessage("Login successful!");
                setShowToast(true);
                
                // Short delay before afterLogin
                setTimeout(() => {
                    afterLogin(respObj);
                }, 1000);
            } else {
                setToastMessage(respObj.message || "Login failed. Please try again.");
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error in handleLogin ->", error.message);
            setToastMessage("An error occurred. Please try again.");
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
                <h1 className={styles.title}>Welcome back</h1>
                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            required
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button}>Sign in</button>
                    <Link to="/sign-up" className={styles.signupLink}>Don&apos;t have an account? <span>Sign up</span></Link>
                </form>
            </div>
        </div>
    );
};

LoginPage.propTypes = {
    afterLogin: PropTypes.func,
};

export default LoginPage;