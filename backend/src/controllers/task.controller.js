import Task from "../models/task.schema.js";

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
            // user: req.user?._id      //uncomment it when add authentication feature
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
