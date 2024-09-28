/**
 * User controllers
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing our custom modules (or classes, interfaces, etc.)
import mongoose from "mongoose"; // Mongoose for MongoDB object modeling
import User from "../../schemes/user/user_schema"; // User schema for database operations
import CustomError from "../../utils/error/CustomError"; // Custom error handling module

// Importing third party modules
import { Request, Response, NextFunction } from "express"; // Types for request, response, and middleware

/**
 * Controller to get user profile information based on profile ID.
 *
 * @async
 * @function getUserProfileInformations
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const getUserProfileInformations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate the presence of profile ID in request parameters
        if (!req.params.profileId) {
            return next(new CustomError("Please provide a profile id", 404));
        }

        // Validate that the provided profile ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.profileId)) {
            return next(new CustomError("Please provide a validated profile id", 400));
        }

        const profileId = req.params.profileId; // Extract the profile ID from request parameters

        // Find the user by profile ID
        const user = await User.findById(profileId);

        // If no user is found, throw an error
        if (!user) {
            return next(new CustomError("There is no user with that id.", 404));
        }

        // Respond with the found user data
        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        // Handle any errors that occur during the process
        return next(err);
    }
};
