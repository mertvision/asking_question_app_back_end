/**
 * Server's middlewares
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of Third Party Libraries
import express from "express"; // Importing Express for server framework
import helmet from "helmet"; // Importing Helmet for securing HTTP headers
import morgan from "morgan"; // Importing Morgan for logging HTTP requests
import cookieParser from "cookie-parser"; // Importing Cookie Parser for parsing cookies
import cors from "cors"; // Importing CORS for enabling Cross-Origin Resource Sharing
import router from "../../routes/routes"; // Importing the main router for API routes
import customErrorHandler from "../../middlewares/handler/custom_error_handler"; // Importing custom error handler middleware

/**
 * Initializes the server middlewares.
 *
 * @param {any} server - The Express server instance.
 * @returns {void}
 */
export const initServerMiddlewares = (server: any): void => {
    server.use(cors()); // Enable CORS for all routes
    server.use(express.json()); // Parse incoming JSON requests
    server.use(cookieParser()); // Parse cookies from incoming requests
    server.use('/api', router); // Use the router for handling API routes under /api
    server.use(customErrorHandler); // Custom error handler middleware to manage errors
    server.use(helmet()); // Use Helmet to secure the app by setting various HTTP headers
    server.use(morgan('dev')); // Use Morgan for logging requests in 'dev' format
};
