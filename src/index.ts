/**
 * Main entry file for the server
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing third-party modules
import express from "express";
// Importing custom modules
import {initServerConfigurations} from "./init/config/server_config"; // Server configuration initialization
import {initServerMiddlewares} from "./init/middlewares/server_middlewares"; // Server middlewares initialization
// Importing database connection functions
import {ConnectMongodb} from "./database/connections/connect_mongodb"; // MongoDB connection
// Importing init server module
import {init} from "./init/server/init_server"; // Server initialization

// Creating an instance of the express server
const server = express();

// Invoking initialization modules
initServerConfigurations();
initServerMiddlewares(server);
// Connecting to MongoDB
ConnectMongodb();
// Initializing the server
init(server);

// Extending Express Request interface
declare global {
    namespace Express {
        interface Request {
            user?: {
                id?: string;
                name?: string;
            };
        }
    }
};
