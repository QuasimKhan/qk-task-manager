import Task from "../models/task.schema.js";
import mongoose from "mongoose";

export const createTaskController = async (req, res) => {
    try {
        const { title, description, status, priority } = req.body;

        //validation
        if (!title) {
            return res.status(400).send({
                success: false,
                message: "Title is required",
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            user: req.user?._id, //uncomment it when add authentication feature
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user?._id });

        if (tasks.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Tasks not found, Please add tasks",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task fetched from the database",
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

export const getTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        //validate the id because server expects 24 character id if we write like api/tasks/123 it will show a cast error
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid task id",
                data: null,
            });
        }
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
                data: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "Task found successfully",
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

export const editTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, status, priority } = req.body;

    try {
        //validate the taskId
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid task id.",
                data: null,
            });
        }

        //prepare for dynamic update data
        const updateFeilds = {};

        if (title !== undefined) {
            updateFeilds.title = title;
        }
        if (description !== undefined) {
            updateFeilds.description = description;
        }
        if (status !== undefined) {
            updateFeilds.status = status;
        }
        if (priority !== undefined) {
            updateFeilds.priority = priority;
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, updateFeilds, {
            new: true,
            runValidators: true,
        });

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not Found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Task updated Successfully",
            data: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

export const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        //validate task id
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                success: false,
                message: "Please enter the valid task id",
                data: null,
            });
        }

        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task Id not found",
                data: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "Task has been deleted successfully",
            data: deletedTask,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};
