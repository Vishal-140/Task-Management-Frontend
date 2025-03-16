import { useState } from "react";
import styles from "./AskAi.module.css";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AskAi = ({ currUser, handleLogout }) => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAskAi = async () => {
        if (!query.trim()) {
            setError("Please enter a question.");
            return;
        }
        setError("");
        setLoading(true);
        setResponse("");

        try {
            const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/ai/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ query }),
            });
            const data = await res.json();
            setResponse(data?.data?.answer || "No response from AI.");
        } catch (err) {
            setError("Failed to fetch AI response. Please try again.");
            console.error("AI Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar currUser={currUser} handleLogout={handleLogout} />
            <div className={styles.container}>
                <h2 className={styles.title}>Ask AI</h2>
                <div className={styles.layout}>
                    {/* Left Side - Input Box & Button */}
                    <div className={styles.inputBox}>
                        <textarea
                            className={styles.textarea}
                            rows="3"
                            placeholder="Ask AI about your tasks..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            className={styles.button}
                            onClick={handleAskAi}
                            disabled={loading}
                        >
                            {loading ? "Thinking..." : "Ask AI"}
                        </button>
                    </div>

                    {/* Right Side - Output Box */}
                    <div className={styles.responseBox}>
                        {response && (
                            <div className={styles.responseContent}>
                                <strong>AI Response:</strong>
                                <pre style={{ whiteSpace: "pre-wrap" }}>{response}</pre>

                            </div>
                        )}
                    </div>
                </div>

                {error && <p className={styles.error}>{error}</p>}
            </div>
            <div className={styles.footerWrapper}>
                <Footer />
            </div>
        </>
    );
};

AskAi.propTypes = {
    currUser: PropTypes.object,
    handleLogout: PropTypes.func.isRequired,
};

export default AskAi;
