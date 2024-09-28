/**
 * Users routes for handling user profile-related API endpoints
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import {getUserProfileInformations} from "../../controllers/profile/profile_controllers"; // Importing the function to get user profile information
import {generateRouter} from "../../utils/router/router"; // Importing the router generator
const profileRouter = generateRouter(); // Creating a new router for profile routes

// Route for retrieving user profile information by profile ID
profileRouter.get('/:profileId', getUserProfileInformations);

export default profileRouter; // Exporting the profile router
