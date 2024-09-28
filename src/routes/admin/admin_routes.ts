/**
 * Admin routes for handling admin-related API endpoints
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing our custom modules (or classes, interfaces, etc.)
import { generateRouter } from "../../utils/router/router"; // Importing the router generator
import { Request, Response } from "express"; // Importing Request and Response types from Express

// Define an admin router
const adminRouter = generateRouter();

// Route for accessing the admin panel
adminRouter.get('/admin', (req: Request, res: Response) => { res.end("Admin"); }); // http://localhost:PORT/api/admin

// Exporting the admin router
export default adminRouter;
