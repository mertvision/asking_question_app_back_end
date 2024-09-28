/**
 * Main file for server routes
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of Our Custom Modules (classes, interfaces, routes, etc.)
import {generateRouter} from "../utils/router/router"; // Module for generating a new router
import authRouter from "./auth/auth_routes"; // Authentication routes
import accountRouter from "./account/account_routes"; // Account management routes
import profileRouter from "./profile/profile_routes"; // User-related routes
import adminRouter from "./admin/admin_routes"; // Admin routes
import questionRouter from "./question/question_routes"; // Question routes

// Creating a new router
const router = generateRouter();

/* Defining server routes
API Endpoints */
router.use('/auth', authRouter);     // http://localhost:PORT/api/auth
router.use('/account', accountRouter); // http://localhost:PORT/api/account
router.use('/profile', profileRouter);     // http://localhost:PORT/api/users
router.use('/admin', adminRouter);     // http://localhost:PORT/api/admin
router.use('/question', questionRouter); // http://localhost:PORT/api/question

// Exporting the router
export default router;
