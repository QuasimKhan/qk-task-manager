import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api.js";

const Login = () => {
    const navigate = useNavigate();

    // ---------- STATE ----------
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ---------- HANDLERS ----------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { email, password } = formData;

        // --- Basic Validation ---
        if (!email.trim() || !password.trim()) {
            setError("Email and Password are required");
            return;
        }

        try {
            setLoading(true);
            const res = await login({ email, password });
            console.log("Response:", res);

            if (res?.success) {
                setSuccess("Login successful! Redirecting...");
                setTimeout(() => navigate("/"), 1200); // Redirect after login
            } else {
                setError(res?.message || "Login failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
            setFormData({ email: "", password: "" });
        }
    };

    // ---------- JSX ----------
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Login</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                    style={styles.input}
                    autoComplete="email"
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    style={styles.input}
                    autoComplete="current-password"
                />

                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p style={styles.redirectText}>
                Don’t have an account?{" "}
                <span onClick={() => navigate("/register")} style={styles.link}>
                    Register here
                </span>
            </p>
        </div>
    );
};

// ---------- INLINE STYLES ----------
const styles = {
    container: {
        maxWidth: "400px",
        margin: "60px auto",
        padding: "30px",
        borderRadius: "10px",
        background: "#ffffff",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Inter, sans-serif",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#222",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        fontSize: "15px",
        transition: "all 0.3s ease",
    },
    button: {
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "12px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "all 0.3s ease",
    },
    error: {
        color: "red",
        fontSize: "14px",
        textAlign: "center",
    },
    success: {
        color: "green",
        fontSize: "14px",
        textAlign: "center",
    },
    redirectText: {
        textAlign: "center",
        marginTop: "15px",
        fontSize: "14px",
    },
    link: {
        color: "#007bff",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default Login;
