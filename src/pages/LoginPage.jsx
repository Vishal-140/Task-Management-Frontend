import { Link } from "react-router";
import "./LoginPage.css";

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
        <div className="login-container">
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" name="email" required />
                <input type="password" placeholder="Password" name="password" required />
                <button type="submit">Login</button>
            <Link to="/sign-up" className="login-link">SignUp</Link>
            </form>
        </div>
    );
};

export default LoginPage;
