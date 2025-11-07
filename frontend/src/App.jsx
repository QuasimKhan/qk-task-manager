import "./App.css";
import CreateTask from "./pages/CreateTask";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-task" element={<CreateTask />} />
            </Routes>
        </>
    );
}

export default App;
