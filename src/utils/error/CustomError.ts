/**
 * Custom error class for error handling
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

class CustomError extends Error {
    public status: number; // HTTP status code associated with the error

    // Constructor to initialize the error message and status
    constructor(message: string, status: number) {
        super(message); // Call the parent class constructor
        this.name = 'CustomError'; // Set the error name
        this.status = status; // Assign the status code
    }
}

export default CustomError; // Export the CustomError class
