import { Request, Response, NextFunction } from 'express'; // Importing types for Express requests and responses
import CustomError from '../../utils/error/CustomError'; // Importing custom error handling class

// Middleware function to handle custom errors
const customErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    // Initialize the customError variable with the original error
    let customError = err;

    // Check the type of error and create a CustomError instance accordingly
    if (err.name === 'SyntaxError') {
        // Handle syntax errors with a specific message and status code
        customError = new CustomError('Unexpected Syntax', 400);
    } else if (err.name === 'ValidationError') {
        // Handle validation errors with the error's message and a status code of 400
        customError = new CustomError(err.message, 400);
    } else if (err.code === 11000) {
        // Handle MongoDB duplicate key errors with a specific message and status code
        customError = new CustomError('The email or username you entered is already being used. Please choose a different email or username.', 400);
    }

    // Send the error response with the appropriate status code and message
    res.status(customError.status || 500).json({
        success: false, // Indicates that the request was not successful
        message: customError.message // Error message to be sent in the response
    });
};

export default customErrorHandler; // Exporting the custom error handler middleware
