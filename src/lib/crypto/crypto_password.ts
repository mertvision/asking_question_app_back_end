/**
 * Crypto classes
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import bcrypt from "bcrypt"; // Importing bcrypt for hashing
import { NextFunction } from "express"; // Importing NextFunction type from express

/**
 * Class for handling password encryption and comparison
 */
export class CryptoPassword {
    /**
     * Hashes a user's password using bcrypt.
     *
     * @param password - The plain text password to hash.
     * @param next - The NextFunction for error handling.
     * @returns The hashed password.
     */
    static async hashUserPassword(password: string, next: NextFunction) {
        try {
            // Generate a salt with 10 rounds of processing
            const salt = await bcrypt.genSalt(10);
            // Hash the password with the generated salt
            const hashedPassword = await bcrypt.hash(password, salt);
            // Return the hashed password
            return hashedPassword;
        } catch (err) {
            // Pass the error to the next middleware
            next(err);
        };
    };

    /**
     * Compares a plain password with a hashed password to check for equality.
     *
     * @param password - The plain text password to compare.
     * @param hashedPassword - The hashed password to compare against.
     * @param next - The NextFunction for error handling.
     * @returns True if the passwords match, false otherwise.
     */
    static async comparePassword(password: string, hashedPassword: string, next: NextFunction) {
        try {
            // Compare the plain password with the hashed password
            const result = await bcrypt.compare(password, hashedPassword);
            return result;
        } catch (err) {
            // Pass the error to the next middleware
            next(err);
        };
    };
};
