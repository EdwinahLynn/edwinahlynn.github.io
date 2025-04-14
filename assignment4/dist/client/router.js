"use strict";
// Import the function that loads the header from the header class
import { Header } from "./header.js";
// Create a class that handles route navigation
export class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }
    // Called when an object is created
    init() {
        // This gets the URL of the current page when the page loads
        window.addEventListener("DOMContentLoaded", () => {
            const path = location.hash.slice(1) || "/";
            console.log(`[INFO] Initial Page Load: ${path}`);
            this.loadRoute(path);
        });
        // This updates the page when the user clicks the back and forth tab buttons
        console.log("[INFO] Navigating to ..");
        window.addEventListener("popstate", () => {
            this.loadRoute(location.hash.slice(1));
        });
    }
    // Changes the url path to include a hash and routes to that file
    navigate(path) {
        location.hash = path;
    }
    // Create a function that gets the base path of the path passed to it
    loadRoute(path) {
        console.log(`[INFO] Loading route: ${path}`);
        // Get the base path
        const originalPath = path.split("#")[0];
        // If the path doesn't exist in the route map load to the error page
        if (!this.routes[originalPath]) {
            console.warn(`[WARNING] Route not found: ${originalPath}, redirecting to 404`);
            location.hash = "/404";
        }
        // Fetch the contents in the respective paths
        fetch(this.routes[originalPath])
            .then(response => {
            // Display an error if the response was not okay
            if (!response.ok)
                throw new Error(`Failed to load ${this.routes[originalPath]}`);
            return response.text();
        })
            .then(html => {
            console.log("Adding to main tag");
            // Add the HTML content fetched to the main tag
            let mainTag = document.querySelector("main");
            // Remove any content that might have been present in the tag
            if (mainTag.innerHTML !== "") {
                mainTag.innerHTML = "";
            }
            mainTag.innerHTML = html;
            // Load the header in every page
            Header().then(() => {
                document.dispatchEvent(new CustomEvent("routeLoaded", { detail: originalPath }));
            });
        })
            // Display an error message if there was an error fetching data
            .catch(error => console.log("[ERROR] Error loading page:", error));
    }
}
//# sourceMappingURL=router.js.map