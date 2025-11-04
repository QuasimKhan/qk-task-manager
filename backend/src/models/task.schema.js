import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true, // removes extra spaces
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: false,
        },
        priority: {
            type: String,
            required: true,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
