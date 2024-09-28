/**
 * Account routes
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing custom modules (controllers and router)
import { forgotAccountPassword, resetAccountPassword, updateAccountInformations } from "../../controllers/account/account_controllers"; // Importing account-related controller functions
import { generateRouter } from "../../utils/router/router"; // Importing the router generator

// Creating the account router
const accountRouter = generateRouter(); // Initializing the account router

// Defining account-related routes
accountRouter.put('/forgotpassword', forgotAccountPassword); // Route for handling forgotten password requests
accountRouter.put('/resetpassword', resetAccountPassword); // Route for handling password reset requests
accountRouter.put('/updateaccount', updateAccountInformations); // Route for updating account information

// Exporting the account router
export default accountRouter; // Exporting the configured account router

