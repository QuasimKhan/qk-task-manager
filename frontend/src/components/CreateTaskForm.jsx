import React, { useState } from "react";
import { createTask } from "../services/api.js";

const CreateTaskForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);
    const [priority, setPriority] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        if (!priority) {
            alert("Priority is required");
            return;
        }

        const newTask = { title, description, priority, status };

        const emptyFields = () => {
            setTitle("");
            setDescription("");
            setPriority("");
            setStatus(false);
        };

        try {
            const res = await createTask(newTask);
            console.log("Task Created : ", res);
            alert("Task Created Successfully");
            emptyFields();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />

                <textarea
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <br />

                <label>
                    Completed:
                    <input
                        type="checkbox"
                        checked={status}
                        onChange={(e) => setStatus(e.target.checked)}
                    />
                </label>
                <br />

                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTaskForm;
