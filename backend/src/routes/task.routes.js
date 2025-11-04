import express from "express";
import {
    createTaskController,
    getAllTasks,
    getTask,
} from "../controllers/task.controller.js";

const taskRouter = express.Router();

taskRouter.post("/create-task", createTaskController);
taskRouter.get("/", getAllTasks);
taskRouter.get("/:taskId", getTask);

export default taskRouter;
