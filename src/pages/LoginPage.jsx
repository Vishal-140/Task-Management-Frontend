import "./LoginPage.css";

const LoginPage = () => {
    const handleLogin = async (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div className="login-container">
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" name="email" required />
                <input type="password" placeholder="Password" name="password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
