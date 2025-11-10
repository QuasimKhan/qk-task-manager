import React, { useEffect, useState } from "react";
import { getTasks } from "../services/api.js";
import { Link } from "react-router-dom";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const res = await getTasks();
                console.log("API Response:", res);

                setTasks(res.data); // adjust depending on your backend response
            } catch (error) {
                setError(error.message || "Failed to load the tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <h3>Loading tasks...</h3>;
    if (error) return <h3 style={{ color: "red" }}>Error: {error}</h3>;

    return (
        <div>
            <div>
                <h1>Navbar</h1>
                <Link to="/create-task">Create Task</Link>
                <Link to="/login">Login</Link>
            </div>
            <h2>All Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks found</p>
            ) : (
                tasks.map((task) => (
                    <div
                        key={task._id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            margin: "10px 0",
                        }}
                    >
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>
                            <b>Priority:</b> {task.priority}
                        </p>
                        <p>
                            <b>Status:</b>{" "}
                            {task.status ? "✅ Completed" : "❌ Pending"}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
