import React, { useEffect } from "react";
import { useState } from "react";
import { getTasks } from "../services/api.js";
const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTask = async () => {
            try {
                setLoading(true);
                const res = await getTasks();
                console.log(res.data);

                setTasks(res.data);
            } catch (error) {
                setError(error.message || "Failed to load the task");
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, []);
    return <div>Home</div>;
};

export default Home;
