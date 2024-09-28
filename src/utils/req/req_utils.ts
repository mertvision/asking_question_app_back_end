/**
 * "req" object utils
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing third party modules
import mongoose from "mongoose";
import {NextFunction, Request} from "express";
// Importing our custom modules
import CustomError from "../error/CustomError";

// Middleware to check if a specific parameter ID exists in the request
export const isParameterIdExist = (parameterId: string) => {
    return (req: Request, next: NextFunction) => {
        // Check if the specified parameter ID exists
        if (!req.params[parameterId]) {
            return next(new CustomError(`Please provide an ID.`, 400)); // Return an error if ID is missing
        }
        next(); // Proceed to the next middleware or route handler
    };
};

// Middleware to validate the format of a specific parameter ID
export const isParameterIdValid = (parameterId: string) => {
    return (req: Request, next: NextFunction) => {
        // Check if the specified parameter ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params[parameterId])) {
            return next(new CustomError("Please provide a valid ID.", 400)); // Return an error if ID is invalid
        }
        next(); // Proceed to the next middleware or route handler
    };
};
