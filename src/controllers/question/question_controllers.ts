/**
 * Question Controllers
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing custom modules for error handling, question schema, and slug generation
import CustomError from "../../utils/error/CustomError"; // Custom error handling
import Question from "../../schemes/question/question_schema"; // Question schema for database operations
import { generateUniqueSlug } from "../../utils/slug/slug"; // Utility function to generate unique slugs

// Importing third-party modules from Express and Mongoose
import { Request, Response, NextFunction } from "express"; // Types for request, response, and middleware
import mongoose from "mongoose"; // Mongoose for MongoDB object modeling

/**
 * Controller to handle asking a new question.
 *
 * @async
 * @function askNewQuestion
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const askNewQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let title, content;

        // Validate that title and content are provided
        if (!req.body.title || !req.body.content) {
            return next(new CustomError("Please provide a title and content", 400));
        }

        // Assign title and content from request body
        title = req.body.title;
        content = req.body.content;

        // Generate a unique slug based on the title
        const slug = await generateUniqueSlug(title);
        const authUserId = req.user?.id; // Get authenticated user ID

        // Create a new question document
        const question = await Question.create({
            title: title,
            content: content,
            slug: slug,
            user_id: authUserId,
        });

        // Save the new question to the database
        await question.save();

        // Respond with the created question data
        return res.status(200).json({
            success: true,
            data: question
        });
    } catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    }
};

/**
 * Controller to get a single question by its ID.
 *
 * @async
 * @function getSingleQuestion
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const getSingleQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate the presence of question ID in the request parameters
        if (!req.params.questionId) {
            return next(new CustomError("Please provide a question id", 400));
        }

        // Validate that the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
            return next(new CustomError("Please provide a valid id", 400));
        }

        const questionId = req.params.questionId;

        // Find the question by ID
        const question = await Question.findById(questionId);

        // If no question is found, throw an error
        if (!question) {
            return next(new CustomError("There is no question with that id", 404));
        }

        // Respond with the found question data
        return res.status(200).json({
            success: true,
            data: question
        });
    } catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    }
};

/**
 * Controller to edit an existing question.
 *
 * @async
 * @function editSingleQuestion
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const editSingleQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let question_id, title, content;

        // Validate the presence of question ID in the request parameters
        if (!req.params.questionId) {
            return next(new CustomError("Please provide a question id", 400));
        }

        // Validate that content and title are provided for editing
        if (!req.body.content) {
            return next(new CustomError("Please provide content to edit the question.", 400));
        }

        if (!req.body.title) {
            return next(new CustomError("Please provide a title to edit the question.", 400));
        }

        // Validate that the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
            return next(new CustomError("Please provide a validated question id", 400));
        }

        question_id = req.params.questionId; // Get question ID from parameters
        content = req.body.content; // Get new content from request body
        title = req.body.title; // Get new title from request body

        // Find the question by ID
        let question = await Question.findById(question_id);

        // If no question is found, throw an error
        if (!question) {
            return next(new CustomError("There is no question with that id.", 404));
        }

        // Update question fields
        question.title = title;
        question.content = content;

        // Save the updated question
        await question.save();

        // Respond with a success message and the updated question
        return res.status(200).json({
            message: "Your question has been updated.",
            question
        });
    } catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    }
};

/**
 * Controller to delete a question by its ID.
 *
 * @async
 * @function deleteSingleQuestion
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const deleteSingleQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let authUserId = req.user?.id; // Get authenticated user ID
        let question_id;

        // Validate the presence of question ID in the request parameters
        if (!req.params.questionId) {
            return next(new CustomError("Please provide a question id", 400));
        }

        // Validate that the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
            return next(new CustomError("Please provide a validated question id", 400));
        }

        question_id = req.params.questionId; // Get question ID from parameters

        // Find the question by ID
        const question = await Question.findById(question_id);

        // If no question is found, throw an error
        if (!question) {
            return next(new CustomError("There is no question with that id.", 404));
        }

        // Check if the authenticated user is the owner of the question
        if (String(question.user_id) == authUserId) {
            // Delete the question if the user is the owner
            await Question.findByIdAndDelete(question_id);
            return res.status(200).json({
                success: true,
                message: "Your question has been deleted.",
            });
        }

        // If the user is not the owner, respond with an error message
        return res.status(400).json({
            success: false,
            message: "You cannot delete this question."
        });
    } catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    }
};

/**
 * Controller to like a question (functionality not yet implemented).
 *
 * @async
 * @function likeSingleQuestion
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const likeSingleQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Functionality to be implemented
    } catch (err) {
        // Handle any errors that occur during the process
    }
};

/**
 * Controller to undo a like on a question (functionality not yet implemented).
 *
 * @async
 * @function undolikeSingleQuestion
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const undolikeSingleQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Functionality to be implemented
    } catch (err) {
        // Handle any errors that occur during the process
    }
};
