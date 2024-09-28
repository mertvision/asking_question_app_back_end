/**
 * Answer Schema for MongoDB using Mongoose
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import statement for our custom interfaces
import { AnswerInterface } from "../../interfaces/schemes/answer/answer_interface";

// Import statement for third-party modules
import mongoose, { Schema } from "mongoose";

// Answer schema declaration
const AnswerSchema: Schema<AnswerInterface> = new Schema({
    content: {
        type: String,
        required: [true, "Please provide a content for the answer."], // Content is required
        minlength: [10, "Please provide minimum 10 characters."], // Minimum content length
    },
    user_id: {
        type: mongoose.Schema.ObjectId, // Reference to the User model
        required: true, // User ID is required
        ref: "User",
    },
    question_id: {
        type: mongoose.Schema.ObjectId, // Reference to the Question model
        required: true, // Question ID is required
        ref: "Question",
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId, // References to User IDs who liked the answer
            required: true,
            ref: "User"
        },
    ],
    created_at: {
        type: Date,
        default: Date.now, // Sets the default value to the current date
    },
});

// Create an Answer model based on the AnswerSchema
const Answer = mongoose.model<AnswerInterface>('Answer', AnswerSchema);

export default Answer; // Export the Answer model
