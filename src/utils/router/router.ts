/**
 * Router generation module
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import express from "express";

// Function to create and return a new Express router
export const generateRouter = () => {
    const router = express.Router(); // Create a new router instance
    return router; // Return the created router
};
