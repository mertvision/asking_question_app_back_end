/**
 * Authentication controllers
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of Built-in Modules (Node.js API)

// Import Statement of Our Custom Modules (or classes, interfaces, etc.)
import { JWTLib } from "../../lib/jwt/jwt"; // JWT library for token handling
import { CryptoPassword } from "../../lib/crypto/crypto_password"; // Library for password hashing
import User from "../../schemes/user/user_schema"; // User schema for database operations
import ResetPassword from "../../schemes/reset_password/reset_password_schema"; // Schema for password reset tokens

// Import Statement of Third Party Modules
import { Request, Response, NextFunction } from "express"; // Express types for request, response, and middleware
import CustomError from "../../utils/error/CustomError"; // Custom error handling class

/**
 * Register provides user registration functionality.
 *
 * @async
 * @function register
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Destructure name, username, email, and password from the request body
        const { name, username, email, password } = req.body;

        // Hash the user's password using the CryptoPassword utility
        const hashedPassword = await CryptoPassword.hashUserPassword(password, next);

        // Create a new user in the database
        const user = await User.create({
            name: name,
            username: username,
            email: email,
            password: hashedPassword
        });

        // Save the new user to the database
        await user.save();

        // Create a reset password schema entry for the new user
        const generateResetPasswordSchema = await ResetPassword.create({
            user_id: user?.id,
            reset_password_token: "",
            reset_password_token_expire: Date.now(),
        });

        // Save the reset password schema entry
        await generateResetPasswordSchema.save();

        // Respond with a success message
        return res.status(200).json({
            success: true,
            message: "You have been registered. Now login."
        });
    }
    catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    };
};

/**
 * Login user into the application.
 *
 * @async
 * @function login
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let email;
        let password;

        // Validate email presence in request body
        if (!req.body.email) {
            return next(new CustomError("Please provide an e-mail address to login", 400));
        } else {
            email = req.body.email;
        }

        // Validate password presence in request body
        if (!req.body.password) {
            return next(new CustomError("Please provide a password to login", 400));
        } else {
            password = req.body.password;
        }

        // Find the user by email, including password for comparison
        const user = await User.findOne({ email: email }).select("+password");

        // If no user is found, throw an error
        if (!user) {
            return next(new CustomError("There is no user with that e-mail address.", 404));
        }

        // Compare the provided password with the stored hashed password
        const result = await CryptoPassword.comparePassword(password, user.password, next);

        // If password comparison fails, throw an error
        if (!result) {
            return next(new CustomError("Password is incorrect.", 400));
        }

        // Generate and send a JWT token for the authenticated user
        JWTLib._sendToken(user, res);
        return;
    }
    catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    };
};

/**
 * Retrieve the authenticated user's details.
 *
 * @async
 * @function getMe
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve the authenticated user's ID from the request
        const authUserId = req.user?.id;

        // Check if the user is authenticated
        if (!authUserId) {
            return next(new CustomError("You are not authenticated. Please login", 400));
        }

        // Find the user by ID
        const user = await User.findById(authUserId);

        // If no user is found, throw an error
        if (!user) {
            return next(new CustomError("There is no user with that id.", 400));
        }

        // Respond with the user data
        return res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (err) {
        // Handle any errors that occur during the process
        next(err);
    }
};

/**
 * Logout the user by clearing the access token cookie.
 *
 * @async
 * @function logout
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Clear the access token cookie and respond with a success message
        return res.status(200).clearCookie("access_token").json({
            success: true,
            message: "You have been logged out."
        });
    }
    catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    }
};
