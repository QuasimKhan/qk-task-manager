import React, { useState } from "react";

const CreateTaskForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);
    const [priority, setPriority] = useState(["low", "medium", "high"]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTaskForm;
