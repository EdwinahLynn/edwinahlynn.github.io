"use strict";

// Import the router from the main script file
import {router} from "./main.js";

export async function Header(){
    console.log("[INFO] Loading header");

    // Fetch the html elements from the header file and add to the current page
    return fetch("./views/components/header.html")
        .then(response => response.text())
        .then(data => {
            (document.querySelector("header")as HTMLElement).innerHTML = data;

            // Call the function that updates links, loads the search bar and checks the login status of the user
            updateNavBarLinks();
            LoadSearchBar();
            CheckLogin();
        })
        .catch(error =>{
            // Throw and error if something fails
            console.log("[ERROR] Unable to load header");
        });
}

// Create a function for loading the search bar
export function LoadSearchBar(){

    // Get obtain the div container and get the links inside it plus the search bar
    let searchBox = (document.getElementById("search") as HTMLInputElement);
    let divContainer = (document.getElementById("hasLinks") as HTMLElement);
    let links = (divContainer.getElementsByTagName("a") as HTMLCollectionOf<HTMLAnchorElement>);

    // Filter
    // Attach an event listener for the search box everytime a letter is pressed
    searchBox.addEventListener("keyup", function () {
        // Change the value type in the box to lower case letters
        let searchBoxValue = searchBox.value.toLowerCase();

        // Loop through all link items
        for (let i = 0; i < links.length; i++) {

            // Get the text in each link
            let text = links[i].innerHTML;

            // convert the text to lower cases letters and see if the entered text matches the link texts
            if (text.toLowerCase().indexOf(searchBoxValue) > -1) {

                // Assign the link texts to the placeholder attribute(search box value)
                searchBox.placeholder = links[i].innerHTML;
            }
            // If the texts don't match, don't display a value
            else {
                searchBox.placeholder = "";
            }
        }
    });
    // The above filter idea is referenced from :
    //  How TO - Search Menu .W3schools. https://www.w3schools.com/howto/howto_js_search_menu.asp

    // Attach an event listener to the search button when its clicked
    let searchButton = document.getElementById("searchButton") as HTMLButtonElement;
    searchButton.addEventListener("click", function (event) {

        // Prevent the default behavior
        event.preventDefault();

        // Get the div container and all links in it, plus the search bar
        let divContainer = document.getElementById("hasLinks") as HTMLElement | null;
        if(!divContainer) {
            console.log("Div Container not found");
            return;
        }
        let links = divContainer.getElementsByTagName("a");
        let searchBox = document.getElementById("search") as HTMLInputElement;

        // Change the entered value to lower case letters
        let searchBoxValue = searchBox.value.trim().toLowerCase();

        // Loop through each link
        for (let i = 0; i < links.length; i++) {
            // Convert the link texts to lower case letters
            let text = links[i].innerText.toLowerCase();

            // Check if the entered text matches the link text
            if (searchBoxValue === text) {
                // If they match, go to that page
                location.href = links[i].href;
                return;
            }
        }
    });
}


// Create a function that updates the active status of the links
export function updateNavBarLinks(){
    console.log("[INFO] Updating active nav link...");

    // Get the current url path and also the anchor links in the nav bar
    const currentUrlPath = location.hash.slice(1);
    const navBarLinks = document.querySelectorAll("nav a");

    //Loop through every link in the nav bar and replace  the href attribute with a # or leave empty
    navBarLinks.forEach((link:Element) => {
        const linkPath = link.getAttribute("href")?.replace("#","") || "";

        // Set the link class to active if the current url matches the link in the loop and remove if they don't match
        if (currentUrlPath === linkPath) {
            link.classList.add("active");
        }
        else
        {
            link.classList.remove("active");
        }
    });
}

// Create a function to check the login status of the user
export function CheckLogin() {

    // Get the login link and display an error message if it's not found
    const loginNav = document.getElementById("login") as HTMLAnchorElement;
    if(!loginNav){
        console.warn("[WARNING] LoginNav element not found! Skipping CheckLogin().");
        return;
    }

    // Get session item user
    const userSession = sessionStorage.getItem("user");

    // Check if there is a user in the session
    if(userSession){
        //Change the link text to log out and place a suitable logout icon
        loginNav.innerHTML = `<i class = "fas fa-sign-out-alt"></i> Logout`;
        loginNav.href = "#";

        // Add an event handles that calls the log-out function when its clicked
        loginNav.addEventListener("click", Logout);

        // Make the links to the statistics page and event planning page visible to the user
        let statisticsNavLink = document.getElementById("stat") as HTMLElement;
        let eventsPlanningNavLink  = document.getElementById("planning") as HTMLElement;
        let accountPageNavLink = document.getElementById("accountPage") as HTMLElement;
        let communityPostNavLink = document.getElementById("communityPosts") as HTMLElement;
        statisticsNavLink.style.display= "block";
        eventsPlanningNavLink.style.display = "block";
        accountPageNavLink.style.display = "block";
        communityPostNavLink.style.display = "block";

        // Display a welcome message to the user
        let message = document.getElementById("welcomeMessage");
        // Convert the JSON text to a java readable text
        let user = JSON.parse(userSession);
        if (!message){
            console.log("Message Tag not found")
            return;
        }
        message.innerText = `Welcome back ${user.Username} !`;
    }

    // If there is no user in the session
    else{
        // Change the text to login and change the icon too
        loginNav.innerHTML = `<i class = "fas fa-sign-out-alt"></i> Login`;

        // Remove the event handler that calls the logout function
        loginNav.removeEventListener("click", Logout);

        // Hide the links to the statistics and event planning page
        let statisticsNavLink = document.getElementById("stat") as HTMLElement;
        let eventsPlanningNavLink  = document.getElementById("planning") as HTMLElement;
        let accountPageNavLink = document.getElementById("accountPage") as HTMLElement;
        let communityPostNavLink = document.getElementById("communityPosts") as HTMLElement;
        statisticsNavLink.style.display = "none";
        eventsPlanningNavLink.style.display = "none";
        accountPageNavLink.style.display = "none";
        communityPostNavLink.style.display = "none";
    }
}


// Create a function to remove the session and logout out of the page
function  Logout(event:any){
    event.preventDefault();

    sessionStorage.removeItem("user");
    console.log("[INFO] User logged out. Updating UI...");
    router.navigate("/login");
}