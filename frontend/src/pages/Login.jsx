import { useState } from "react";
import "../design/login.css";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("All fields are required");
            return;
        }   
        if (!email.includes("@")) {
            setError("Invalid email address");
            return;
        }
        setError("");
        alert("Login successful!");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
                <p>Don't have an account?<button className="signup-btn">Sign Up</button></p>
            </div>
        </div>
    );
}