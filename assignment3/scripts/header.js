"use strict";

import {router} from "./main.js";

/**
 * Dynamically load the header from the header.html into the current page
 */
export async function Header(){
    console.log("[INFO] Loading header");

    return fetch("./views/components/header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
            updateActiveNavLink();
            LoadSearchBar;
            console.log("in header")
            CheckLogin();
        })
        .catch(error =>{
            console.log("[ERROR] Unable to load header");
        });
}

export async function LoadSearchBar(){
    // Call the login function

    // Get obtain the div container and get the links inside it plus the search bar
    let searchBox = document.getElementById("search");
    let divContainer = document.getElementById("hasLinks");
    let links = divContainer.getElementsByTagName("a");

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
    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function (event) {

        // Prevent the default behavior
        event.preventDefault();

        // Get the div container and all links in it, plus the search bar
        let divContainer = document.getElementById("hasLinks");
        let links = divContainer.getElementsByTagName("a");
        let searchBox = document.getElementById("search");

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

export function updateActiveNavLink(){
    console.log("[INFO] Updating active nav link...");

    const currentPath = location.hash.slice(1);
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {

        const linkPath = link.getAttribute("href").replace("#","");

        if (currentPath === linkPath) {
            link.classList.add("active");
        }
        else
        {
            link.classList.remove("active");
        }
    });
}
function CheckLogin() {

    const login = document.getElementById("login");

    if(!login){
        console.warn("[WARNING] LoginNav element not found! Skipping CheckLogin().");
        return;
    }

    const userSession = sessionStorage.getItem("user");

    if(userSession){
        login.innerHTML = `<i class = "fas fa-sign-out-alt"></i> Logout`;
        login.href = "#";

        //login.removeEventListener("click", handleLogout);
        login.addEventListener("click", handleLogout);
        let statisticsNavLink = document.getElementById("stat");
        let eventsPlanningNavLink  = document.getElementById("planning");
        statisticsNavLink.style.display= "block";
        eventsPlanningNavLink.style.display = "block";
        let message = document.getElementById("welcomeMessage");
        let user = JSON.parse(userSession);
        message.innerText = `Welcome back ${user.Username} !`;
    }
    else{
        login.innerHTML = `<i class = "fas fa-sign-out-alt"></i> Login`;
        login.removeEventListener("click", handleLogout);
        let statisticsNavLink = document.getElementById("stat");
        let eventsPlanningNavLink  = document.getElementById("planning");
        statisticsNavLink.style.display = "none";
        eventsPlanningNavLink.style.display = "none";
    }
}

function  handleLogout(event){
    event.preventDefault();

    sessionStorage.removeItem("user");
    console.log("[INFO] User logged out. Updating UI...");
    router.navigate("/login");

    /*Header().then(() =>{
        router.navigate("/login");
    });*/
}