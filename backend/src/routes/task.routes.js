import express from "express";
import { createTaskController } from "../controllers/task.controller.js";

const taskRouter = express.Router();

taskRouter.post("/create-task", createTaskController);

export default taskRouter;
