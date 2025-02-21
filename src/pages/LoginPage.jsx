import { Link } from "react-router";
import styles from "./LoginPage.module.css";
import PropTypes from 'prop-types';

const LoginPage = ({ afterLogin }) => {
    const handleLogin = async (e) => {
        e.preventDefault();

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
            afterLogin(respObj);
        } else {
            alert(respObj.message);
        }
    };

    return (
        <div className={styles.container}>
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
