import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import taskRouter from "./src/routes/task.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());

//connect db
connectDB();

//routes
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
    res.send("The Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
