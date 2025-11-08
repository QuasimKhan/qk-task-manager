import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import taskRouter from "./src/routes/task.routes.js";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./src/routes/auth.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//connect db
connectDB();

//routes
app.use("/api/tasks", taskRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("The Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
