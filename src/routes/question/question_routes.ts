/**
 * Questions routes for handling question-related API endpoints
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing our custom modules (or classes, interfaces, etc.)
import {askNewQuestion, deleteSingleQuestion, editSingleQuestion, getSingleQuestion, likeSingleQuestion, undolikeSingleQuestion} from "../../controllers/question/question_controllers";
import {hasAccess} from "../../middlewares/access/access";
import {generateRouter} from "../../utils/router/router";
import answerRouter from "../answer/answer_routes";

// Define a question router
const questionRouter = generateRouter();

// Route for creating a new question
questionRouter.post('/', hasAccess, askNewQuestion);  // http://localhost:PORT/api/question/
// Route for retrieving a single question by its ID
questionRouter.get('/:questionId', getSingleQuestion); // http://localhost:PORT/api/question/:questionId
// Route for editing a question by its ID
questionRouter.put('/edit/:questionId', hasAccess, editSingleQuestion); // http://localhost:PORT/api/question/edit/:questionId
// Route for deleting a question by its ID
questionRouter.delete('/delete/:questionId', hasAccess, deleteSingleQuestion); // http://localhost:PORT/api/question/delete/:questionId
// Route for liking a question by its ID
questionRouter.put('/like/:questionId', hasAccess, likeSingleQuestion); // http://localhost:PORT/api/question/like/:questionId
// Route for undoing a like on a question by its ID
questionRouter.put('/undolike/:questionId', hasAccess, undolikeSingleQuestion); // http://localhost:PORT/api/question/undolike/:questionId

questionRouter.use('/:questionId/answers',answerRouter);
// Exporting the question router
export default questionRouter;
