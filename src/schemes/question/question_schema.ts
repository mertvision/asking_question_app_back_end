/**
 * Question Schema for MongoDB using Mongoose
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import statement for our custom interfaces
import { QuestionInterface } from "../../interfaces/schemes/question/question_interface";

// Import statement for third-party modules
import mongoose, { Schema } from "mongoose";

// Question schema declaration
const QuestionSchema: Schema<QuestionInterface> = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for the question."], // Title is required
        unique: false, // Title does not need to be unique
        minlength: [10, "Please provide a title that is at least 10 characters long."], // Minimum title length
    },
    content: {
        type: String,
        required: [true, "Please provide a content for the question."], // Content is required
        minlength: [20, "Please provide a content that is at least 20 characters long."], // Minimum content length
    },
    slug: {
        type: String,
        required: true, // Slug is required
        unique: true, // Slug must be unique
    },
    user_id: {
        type: mongoose.Schema.ObjectId, // Reference to the User model
        ref: "User",
        required: [true, "Please provide a user id"] // User ID is required
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId, // References to User IDs who liked the question
            ref: "User"
        }
    ],
    answers: [
        {
            type: mongoose.Schema.ObjectId, // References to User IDs who answered the question
            ref: "User"
        }
    ],
    created_at: {
        type: Date,
        default: Date.now(), // Sets the default value to the current date
    },
}, { timestamps: true, versionKey: false }); // Enable timestamps and disable version key

// Create a Question model based on the QuestionSchema
const Question = mongoose.model<QuestionInterface>('Question', QuestionSchema);

export default Question; // Export the Question model
