import "./App.css";
import CreateTask from "./pages/CreateTask";
import Home from "./pages/Home";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
