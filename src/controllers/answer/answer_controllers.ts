/**
 * Answer controllers for answer routes
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing our custom modules for error handling and schema
import CustomError from "../../utils/error/CustomError";
import Answer from "../../schemes/answer/answer_schema";
import {isParameterIdExist, isParameterIdValid} from "../../utils/req/req_utils";

// Importing third-party modules from Express and Mongoose
import {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";

// Function to add a new answer to a specific question
export const addNewAnswerToSingleQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve the authenticated user's ID
        let auth_id = req.user?.id;
        let question_id;
        let content;

        // Validate the question ID from the request parameters
        isParameterIdExist(req.params.questionId);
        isParameterIdValid(req.params.questionId);

        // Check if content for the answer is provided in the request body
        if (!req.body.content) {
            return next(new CustomError("Please provide a content for the answer.", 400));
        };

        // Assign question ID and content from request
        question_id = req.params.questionId;
        content = req.body.content;

        // Create a new answer in the database
        const answer = await Answer.create({
            user_id: auth_id,
            question_id: question_id,
            content: content,
        });

        // Save the answer instance
        await answer.save();

        // Respond with success message
        return res.status(200).json({
            success: true,
            message: "Your answer has been generated",
        });
    }
    catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    };
};

// Function to retrieve all answers for a specific question
export const getAllAnswersOfSingleQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract question ID from request parameters
        let questionId = req.params.questionId;

        // Validate the question ID
        isParameterIdExist(questionId);
        isParameterIdValid(questionId);

        // Find all answers associated with the question ID
        const answers = await Answer.find({ question_id: questionId });

        // If no answers are found, return an empty array
        if (!answers) {
            return res.status(200).json({
                success: true,
                answers: [],
            });
        };

        // Respond with the count and details of the answers found
        return res.status(200).json({
            success: true,
            answers_count: answers.length,
            answers: answers
        });

    }
    catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    }
};

// Function to retrieve a single answer by its ID
export const getSingleAnswerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract answer ID from request parameters
        const answerId = req.params.answerId;

        // Validate the answer ID
        isParameterIdExist(answerId);
        isParameterIdValid(answerId);

        // Find the answer by ID
        const answer = await Answer.findById(answerId);

        // If the answer does not exist, throw an error
        if (!answer) {
            return next(new CustomError("There is no answer with that id.", 404));
        };

        // Respond with the found answer
        return res.status(200).json({
            success: true,
            answer: answer
        });
    }
    catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    };
};

// Function to edit a single answer by its ID
export const editSingleAnswerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve the authenticated user's ID and the answer ID from parameters
        let auth_id = req.user?.id;
        let answerId = req.params?.answerId;
        let content = req.body?.content;

        // Validate the answer ID
        isParameterIdExist(answerId);
        isParameterIdValid(answerId);

        // Check if new content is provided for the answer
        if (!content) {
            return next(new CustomError("Please provide a content to edit the answer.", 400));
        };

        // Find the answer by ID
        const answer = await Answer.findById(answerId);

        // If the answer does not exist, throw an error
        if (!answer) {
            return next(new CustomError("Answer could not be found.", 404));
        };

        // Check if the authenticated user is the owner of the answer
        if (String(answer.user_id) == String(auth_id)) {
            // Update the answer's content
            const editedAnswer = await Answer.findByIdAndUpdate(answerId, {
                $set: { content: content }
            }, { new: true });

            // Respond with the updated answer
            return res.status(200).json({
                success: true,
                answer: editedAnswer
            });

        };
        // If the user is not the owner, deny permission
        return res.status(200).json({
            success: false,
            message: "You cannot edit this answer."
        });

    }
    catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    };
};

// Function to delete a single answer by its ID
export const deleteSingleAnswerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve the authenticated user's ID and the answer ID
        let auth_id = req.user?.id;
        let answerId = req.params?.answerId;

        // Validate the answer ID
        isParameterIdExist(answerId);
        isParameterIdValid(answerId);

        // Find the answer by ID
        const answer = await Answer.findById(answerId);

        // If the answer does not exist, throw an error
        if (!answer) {
            return next(new CustomError("Answer could not be found.", 404));
        };

        // Check if the authenticated user is the owner of the answer
        if (String(answer.user_id) == String(auth_id)) {
            // Delete the answer
            await Answer.findByIdAndDelete(answerId);

            // Respond with success message
            return res.status(200).json({
                success: true,
                answer: "Your answer has been deleted."
            });

        };
        // If the user is not the owner, deny permission
        return res.status(200).json({
            success: false,
            message: "You cannot delete this answer."
        });
    }
    catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    };
};

// Function to like a single answer
export const likeSingleAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve the authenticated user's ID and the answer ID
        let auth_id = req.user?.id;
        let answer_id = req.params.answerId;

        // Validate the answer ID
        isParameterIdExist(answer_id);
        isParameterIdValid(answer_id);

        // Find the answer by ID
        const answer = await Answer.findById(answer_id);

        // If the answer does not exist, throw an error
        if (!answer) {
            return next(new CustomError("Answer could not be found", 404));
        };

        // Check if the user has already liked the answer
        const likeExist = answer.likes.find((like) => String(like) == String(auth_id));

        // If the user has already liked the answer, deny further likes
        if (likeExist) {
            return next(new CustomError("You already liked this answer", 400));
        };

        // Convert the user's ID to an ObjectId
        const authIdAsObjectId = new mongoose.Types.ObjectId(auth_id);

        // Add the user's ID to the answer's likes array
        answer.likes.push(authIdAsObjectId);

        // Save the updated answer
        await answer.save();

        // Respond with success message
        return res.status(200).json({
            success: true,
            message: "You liked this answer"
        });

    }
    catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    }
};
