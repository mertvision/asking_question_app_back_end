/**
 * Reset Password Schema for MongoDB using Mongoose
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import statement for our custom interfaces
import { ResetPasswordInterface } from "../../interfaces/schemes/reset_password/reset_password_interface";

// Import statement for third-party modules
import mongoose, { Schema } from "mongoose";

// Define the ResetPassword schema
const ResetPasswordSchema: Schema<ResetPasswordInterface> = new Schema({
    user_id: {
        type: mongoose.Schema.ObjectId, // Reference to the User model
        required: true, // User ID is required
        ref: "User", // Refers to the User model
    },
    reset_password_token: {
        type: String, // Token used for resetting the password
    },
    reset_password_token_expire: {
        type: Date, // Expiration date for the reset token
        default: Date.now, // Sets the default value to the current date
    }
});

// Create a ResetPassword model based on the ResetPasswordSchema
const ResetPassword = mongoose.model<ResetPasswordInterface>('ResetPassword', ResetPasswordSchema);

export default ResetPassword; // Export the ResetPassword model
