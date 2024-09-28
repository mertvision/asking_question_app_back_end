/**
 * The file containing the function that configures dotenv to allow the server to use environment variables
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import dotenv from "dotenv"; // Importing the dotenv module to manage environment variables

/**
 * Initializes server configurations by loading environment variables from a .env file.
 *
 * @function initServerConfigurations
 * @returns {void}
 */
export const initServerConfigurations = (): void => {
    dotenv.config(); // Load environment variables from the .env file into process.env
};
