import express from "express";
import {
    createTaskController,
    deleteTask,
    editTask,
    getAllTasks,
    getTask,
} from "../controllers/task.controller.js";

const taskRouter = express.Router();

taskRouter.post("/create-task", createTaskController);
taskRouter.get("/", getAllTasks);
taskRouter.get("/:taskId", getTask);
taskRouter.put("/edit/:taskId", editTask);
taskRouter.delete("/delete/:taskId", deleteTask);

export default taskRouter;
