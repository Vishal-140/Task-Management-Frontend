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
            <h1 className={styles.title}>Login Page</h1>
            <form onSubmit={handleLogin} className={styles.form}>
                <input type="email" placeholder="Email" name="email" required className={styles.input} />
                <input type="password" placeholder="Password" name="password" required className={styles.input} />
                <button type="submit" className={styles.button}>Login</button>
                <Link to="/sign-up" className={styles.signupLink}>Sign Up</Link>
            </form>
        </div>
    );
};

LoginPage.propTypes = {
    afterLogin: PropTypes.func,
};


export default LoginPage;
