/**
 * Answer routes
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing custom modules for answer-related functionalities
import {
    addNewAnswerToSingleQuestion,
    deleteSingleAnswerById,
    editSingleAnswerById,
    getAllAnswersOfSingleQuestion,
    getSingleAnswerById,
    likeSingleAnswer
} from "../../controllers/answer/answer_controllers";

// Importing access middleware to control user permissions
import { hasAccess } from "../../middlewares/access/access";

// Importing third-party modules from Express
import express from "express";

// Creating an Express Router instance with merged parameters
const answerRouter = express.Router({ mergeParams: true });

// Route to add a new answer to a specific question
answerRouter.post('/', hasAccess, addNewAnswerToSingleQuestion); // Endpoint: POST http://localhost:PORT/api/question/:questionId/answers/

// Route to retrieve all answers for a specific question
answerRouter.get('/', getAllAnswersOfSingleQuestion); // Endpoint: GET http://localhost:PORT/api/question/:questionId/answers/

// Route to retrieve a specific answer by its ID
answerRouter.get('/:answerId', getSingleAnswerById); // Endpoint: GET http://localhost:PORT/api/question/:questionId/answers/:answerId

// Route to edit a specific answer by its ID
answerRouter.put('/:answerId', hasAccess, editSingleAnswerById); // Endpoint: PUT http://localhost:PORT/api/question/:questionId/answers/:answerId

// Route to delete a specific answer by its ID
answerRouter.delete('/:answerId', hasAccess, deleteSingleAnswerById); // Endpoint: DELETE http://localhost:PORT/api/question/:questionId/answers/:answerId

// Route to like a specific answer
answerRouter.put('/:answerId/like', hasAccess, likeSingleAnswer); // Endpoint: PUT http://localhost:PORT/api/question/:questionId/answers/:answerId/like

// Exporting the configured router for use in other parts of the application
export default answerRouter;

