/**
 * Question Interface
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of Third Party Modules
import mongoose, { Document } from "mongoose"; // Importing mongoose and Document type

/**
 * Interface representing a question document in MongoDB.
 * Extends the Document interface from Mongoose to include MongoDB document methods.
 */
export interface QuestionInterface extends Document {
    /**
     * The title of the question.
     */
    title: string;

    /**
     * The content or body of the question.
     */
    content: string;

    /**
     * A unique slug generated from the title for URL-friendly identification.
     */
    slug: string;

    /**
     * The ObjectId of the user who created the question.
     */
    user_id: mongoose.Schema.Types.ObjectId;

    /**
     * The date when the question was created.
     */
    created_at: Date;

    /**
     * An optional array of ObjectId references representing users who liked the question.
     */
    likes?: mongoose.Schema.Types.ObjectId[];

    /**
     * An optional array of ObjectId references to the answers associated with this question.
     */
    answers?: mongoose.Schema.Types.ObjectId[];
};
