import jwt from "jsonwebtoken"; // Importing the JSON Web Token library
import { Request, Response, NextFunction } from "express"; // Importing types for Express requests and responses
import CustomError from "../../utils/error/CustomError"; // Importing custom error handling class

/**
 * User authentication middleware.
 * After the user is authenticated, they can perform "user" actions.
 */
export const hasAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // The token is taken from the cookie.
        const token = req?.cookies?.access_token; // Retrieving the access token from cookies

        // If the token doesn't exist
        if (!token) {
            return next(new CustomError("Please provide a token or authenticate.", 401)); // Error if token is missing
        }

        // Check if the token is a string
        if (typeof token !== 'string') {
            return next(new CustomError("Invalid token format.", 400)); // Error if token format is invalid
        }

        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string; // Retrieving the JWT secret key from environment variables

        // Verifying the token with the secret key
        jwt.verify(token, JWT_SECRET_KEY, (err: any, result: any) => {
            if (err) {
                return next(err); // Passing any verification errors to the error handler
            }

            // Storing user information in the request object
            req.user = {
                id: result.id, // User ID from the token payload
                name: result.name // User name from the token payload
            };

            next(); // Proceeding to the next middleware or route handler
        });
    } catch (err) {
        return next(err); // Catching and passing any other errors to the error handler
    }
};
