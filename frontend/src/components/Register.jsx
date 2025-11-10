import React from "react";
import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" />
            </form>
        </div>
    );
};

export default Register;
