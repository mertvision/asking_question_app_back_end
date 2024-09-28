/**
 * User schema definition for MongoDB using Mongoose
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import mongoose, { Schema } from "mongoose";
import { UserInterface } from "../../interfaces/schemes/user/user_interface";

const UserSchema: Schema<UserInterface> = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."], // Name is required
    },
    username: {
        type: String,
        required: [true, "Please provide a username value"], // Username is required
        unique: true, // Ensures username is unique
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true, // Ensures email is unique
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Please provide a valid e-mail' // Validates email format
        ]
    },
    role: {
        type: String,
        default: 'user', // Default role is 'user'
        enum: ['user', 'admin'] // Allows only 'user' or 'admin' values
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'], // Ensures password is provided
        minlength: [6, 'Please provide a password longer than 6 characters'], // Validates password length
        select: false // Password is not included in query results by default
    },
    createdAt: {
        type: Date,
        default: Date.now // Sets the default value to the current date
    },
    title: {
        type: String // Optional field for title
    },
    about: {
        type: String // Optional field for additional information
    },
    place: {
        type: String // Optional field for location
    },
    website: {
        type: String // Optional field for website URL
    },
    profile_image: {
        type: String,
        default: 'default.jpg' // Default profile image
    },
    blocked: {
        type: Boolean,
        default: false // Default value for blocked status
    }
});

// Create a User model based on the UserSchema
const User = mongoose.model<UserInterface>('User', UserSchema);

export default User; // Export the User model
