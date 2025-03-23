"use strict";
// Import the router from the main.js file
import { router } from "./main.js";
// Create and export the function that restricts access to all pages unless a user is logged in
export function AuthGuard() {
    // Get the item in session and create a list of routes that are off limits
    const user = sessionStorage.getItem("user");
    const restrictedRoutes = ["", "/", "/home", "/about", "/contact", "/events", "/gallery", "/home", "/login", "/opportunities", "/privacypolicy", "/termsofservice"];
    console.log("In authguard");
    // Check if there is a user in session and if the current link clicked is among the restricted routes
    if (!user && restrictedRoutes.includes(location.hash.slice(1))) {
        // Display an error message in the console and route to the login page
        console.log("[AUTHGUARD] You have Unauthorized access to this page. Redirecting to the login page");
        router.navigate("/login");
        return;
    }
}
//# sourceMappingURL=authguard.js.map