/**
 * The necessary functions used to connect to the MongoDB database
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import mongoose, {ConnectOptions} from "mongoose";

// Define a function to connect MongoDB
export const ConnectMongodb = async (): Promise <void> => {
    try{
        // Attempt to connect to MongoDB using the connection URI from environment variables
        // If process.env.MONGO_URI is not defined, an empty string is used as a fallback
        await mongoose.connect(process.env.MONGO_URI || '', {
            dbName:"stackoverflow"
        } as ConnectOptions);
        // Log a success message if the connection is successful
        console.log("MongoDB connection is successful.")
    }
    catch(err){
        // Log an error message if the connection fails
        console.log("MongoDB connection error:", err);
    };
};