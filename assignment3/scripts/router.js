"use strict";
import { Header } from "./header.js";
export class Router {
    routes;
    constructor(routes) {
        this.routes = routes;
        this.init();
    }
    init() {
        window.addEventListener("DOMContentLoaded", () => {
            const path = location.hash.slice(1) || "/";
            console.log(`[INFO] Initial Page Load: ${path}`);
            this.loadRoute(path);
        });
        //popstate fires when the users click the forward/back button
        console.log("[INFO] Navigating to ..");
        window.addEventListener("popstate", () => {
            this.loadRoute(location.hash.slice(1));
        });
    }
    navigate(path) {
        location.hash = path;
    }
    loadRoute(path) {
        console.log(`[INFO] Loading route: ${path}`);
        // Extract base path: /edit#contact_123 -> edit
        const basePath = path.split("#")[0];
        if (!this.routes[basePath]) {
            console.warn(`[WARNING] Route not found: ${basePath}, redirecting to 404`);
            location.hash = "/404";
            path = "/404";
        }
        fetch(this.routes[basePath])
            .then(response => {
            if (!response.ok)
                throw new Error(`Failed to load ${this.routes[basePath]}`);
            return response.text();
        })
            .then(html => {
            console.log("Adding to main tag");
            let mainTag = document.querySelector("main");
            if (mainTag.innerHTML !== "") {
                mainTag.innerHTML = "";
            }
            mainTag.innerHTML = html;
            // Ensure the for example is "reloaded in every" page change
            Header().then(() => {
                document.dispatchEvent(new CustomEvent("routeLoaded", { detail: basePath }));
            });
        })
            .catch(error => console.log("[ERROR] Error loading page:", error));
    }
}
//# sourceMappingURL=router.js.map