// Name: Edwinah Lynn Ninsiima
// Student ID: 1008884601
// Date: 25th/01/2024

"use strict";

// IIFE - Immediately Invoked Functional Expression

(function () {

    // Create a function for loading events based on the event type
    async function LoadEventsType() {

        // Check to see if the div tag is empty
        let divTag = document.getElementById("eventsDisplay");

        // Empty the div tag if it's not empty
        if (divTag.innerHTML !== "") {
            divTag.innerHTML = "";
        }
        console.log("LoadEvents Info");

        try {
            // Create a function to load the first event type(workshops) in the json file
            async function eventTypes(eventName, events) {

                // Create a heading tag and add it to the body
                let body = document.body;
                let heading = document.createElement("h2");
                heading.textContent = eventName;
                divTag.appendChild(heading);


                // Create a loop to run through the elements in the json file
                events.forEach(event => {
                    console.log("in the loop");

                    // Create paragraph elements for the information in the json file
                    let eventName = document.createElement("p");
                    let eventDescription = document.createElement("p");
                    let eventDateTime = document.createElement("p");
                    let location = document.createElement("p");
                    location.style.marginBottom = "50px";

                    // Set attributes and text content for the paragraph elements
                    eventName.setAttribute("class", "fw-bold");
                    eventName.textContent = event.Name;
                    eventDescription.textContent = event.Description;
                    eventDateTime.textContent = event.Date;
                    eventDateTime.textContent += event.Time;
                    location.textContent = event.Location;

                    // Add the paragraph tags to the div tag
                    divTag.appendChild(eventName);
                    divTag.appendChild(eventDescription);
                    divTag.appendChild(eventDateTime);
                    divTag.appendChild(location);


                    // Insert the div tag with all its content before the radio buttons in the body
                    let form = document.getElementById("forButtons");
                    body.insertBefore(divTag, form);
                })
            }

            // Send a request to the information.json file and throw an error is the response isn't ok
            const response = await fetch("data/information.json");
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            // Assign the json response to a variable
            const jsonData = await response.json();

            // Attain both properties in the json file and assign to them different variables
            const events = jsonData.info;
            const events2 = jsonData.info2;

            // If there is no array in both the variables, display and error message
            if (!Array.isArray(events) && !Array.isArray(events2)) {
                throw new Error("[ERROR] Json data does not contain a valid array")
            }

            // Call the function and pass through the different heading names and json properties
            await eventTypes("Workshops", events);
            await eventTypes("Cleanups", events2);
        }
            // Display an error message if there is an issue with fetching the data from the file
        catch (error) {
            console.error("Error occured while fetching data for events based on type", error);
            let errorMessage = document.getElementById("errorMessage");
            errorMessage.textContent = "Error: Cannot display this information now. Try again later";
        }
        // Call the footer function
        footer();
    }

    // Create a function for loading events based on the date of the event
    async function LoadEventsDate() {

        // Check to see if the div tag is empty
        let divTag = document.getElementById("eventsDisplay");

        // Empty the div tag if it's not empty
        if (divTag.innerHTML !== "") {
            divTag.innerHTML = "";
        }
        console.log("LoadEvents Date");
        try {
            // Send a request to the information.json file and throw an error if the response isn't ok
            const response = await fetch("data/information.json");
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            // Assign the json response and property to a variable
            const jsonData = await response.json();
            const events = jsonData.info;

            // Display and error message if the variable is not an array
            if (!Array.isArray(events)) {
                throw new Error("[ERROR] Json data does not contain a valid array")
            }

            // Create a heading tag and add it to the body
            let body = document.body;
            let heading = document.createElement("h2");
            heading.textContent = "Events based on Time";
            divTag.appendChild(heading);

            // Create a loop to access each element in the json file
            events.forEach(event => {
                console.log("in the loop");

                // Create paragraph tags fof the information in the json file
                let eventName = document.createElement("p");
                let eventDescription = document.createElement("p");
                let eventDateTime = document.createElement("p");
                let location = document.createElement("p");
                location.style.marginBottom = "50px";

                // Assign attributes and text content to the paragraph tags
                eventDateTime.setAttribute("class", "fw-bold");
                eventName.textContent = event.Name;
                eventDescription.textContent = event.Description;
                eventDateTime.textContent = `${event.Date}     ${event.Time}`;
                location.textContent = event.Location;

                // Add the paragraph tags to the div tag
                divTag.appendChild(eventDateTime);
                divTag.appendChild(eventName);
                divTag.appendChild(eventDescription);
                divTag.appendChild(location);

                // Insert the div tag before the radio buttons
                let form = document.getElementById("forButtons");
                body.insertBefore(divTag, form);
            })
        }
            // Display an error message if there is an error in the try block
        catch (error) {
            console.error("Error fetching events based on the date", error);
            let errorMessage = document.getElementById("eventsDisplay");
            errorMessage.textContent = "Unable to load events based on the date. Please try again later";
        }

        // Call the footer function
        footer();
    }

    // Create a function for loading events based on the location for the event
    async function LoadEventsLocation() {

        // Check to see if the div tag is empty
        let divTag = document.getElementById("eventsDisplay");

        // Empty the div tag if it's not empty
        if (divTag.innerHTML !== "") {
            divTag.innerHTML = "";
        }
        console.log("LoadEvents Date");
        try {

            // Send a request to the information.json file and throw an error if the response isn't ok
            const response = await fetch("data/information.json");
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            // Assign the json response and property to a variable
            const jsonData = await response.json();
            const events = jsonData.info;

            // Display and error message if the variable is not an array
            if (!Array.isArray(events)) {
                throw new Error("[ERROR] Json data does not contain a valid array")
            }

            // Create a heading tag and add it to the body
            let body = document.body;
            let heading = document.createElement("h2");
            heading.textContent = "Events based on Location";
            divTag.appendChild(heading);


            // Create a loop to access each element in the json file
            events.forEach(event => {
                console.log("in the loop");

                // Create paragraph tags fof the information in the json file
                let eventName = document.createElement("p");
                let eventDescription = document.createElement("p");
                let eventDateTime = document.createElement("p");
                let location = document.createElement("p");
                eventDateTime.style.marginBottom = "50px";

                // Assign attributes and text content to the paragraph tags
                location.setAttribute("class", "fw-bold");
                eventName.textContent = event.Name;
                eventDescription.textContent = event.Description;
                eventDateTime.textContent = `${event.Date}     ${event.Time}`;
                location.textContent = event.Location;

                // Add the paragpraph tags to the div tag
                divTag.appendChild(location);
                divTag.appendChild(eventName);
                divTag.appendChild(eventDescription);
                divTag.appendChild(eventDateTime);

                // Insert the div tag before the radio buttons
                let form = document.getElementById("forButtons");
                body.insertBefore(divTag, form);
            })
        }
            // Display an error message if there is an error in the try block
        catch (error) {
            console.error("Error fetching events data", error);
            let errorMessage = document.getElementById("eventsDisplay");
            errorMessage.textContent = "Unable to load events based on Location. Please try again later"
        }
        // Call the footer function
        footer();
    }


    // Create a function to check if a user is logged in
    function CheckLogin() {
        console.log("[INFO] Checking user login status..");

        // Get the element that holds the login tet in the header
        const login = document.getElementById("login");

        // Display an error message if the login element isn't found
        if (!login) {
            console.warn("[WARNING] LoginNav element not found! Skipping CheckLogin().");
            return;
        }

        // Get the value that is stored in the session under the key user
        const userSession = sessionStorage.getItem("user");

        // If there is a value, it means there is a user in the session
        if (userSession) {

            // Change the text in the header to logout
            login.innerHTML = `<i class = "fas fa-sign-out-alt"></i> Logout`;
            login.href = "#";

            // Attach an eventlistener to the login link(now showing logout) in the header
            login.addEventListener("click", (event) => {
                event.preventDefault();

                // Remove the user from the session and return to the login page
                sessionStorage.removeItem("user");
                location.href = "login.html";
            })
        }

    }

    // Create a function for the login page
    function DisplayLoginPage() {

        // Get the login button and attach an event listener to it
        let loginButton = document.getElementById("loginButton");
        loginButton.addEventListener("click", async (event) => {
            event.preventDefault();

            // Get the values in the username and password field boxes
            const username = document.getElementById("userName").value.trim();
            const password = document.getElementById("password").value.trim();

            try {

                // Send a request to the users.json file in the data folder
                const response = await fetch("data/users.json");

                // Display an error message if the response is not ok
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                // Assign the property to a variable
                const jsonData = await response.json();
                const users = jsonData.users;

                // Display an error message if the variable is not an array
                if (!Array.isArray(users)) {
                    throw new Error("[ERROR] Json data does not contain a valid array")
                }

                // Declare and assign values to variables that will help with session information
                let isMatch = false;
                let sessionUser = null;

                // Loop through the array and check if the information entered matches any in the file
                for (const user of users) {
                    if (user.Username === username && user.Password === password) {

                        // If there are values that match, set isMatch to true and assign that user to the session user variable
                        isMatch = true;
                        sessionUser = user;
                        break;
                    }
                }

                // If there was a match from the array
                if (isMatch) {

                    // Using the key word user, place the user into that session
                    sessionStorage.setItem("user", JSON.stringify({
                        DisplayName: sessionUser.DisplayName,
                        Username: sessionUser.Username,
                    }));

                    // Redirect to the main page
                    location.href = "index.html"
                }

                // If there were no matched from the array, display error messages
                else {
                    let errorMessage = document.getElementById("errorMessage");
                    errorMessage.classList.add("alert", "alert-danger");
                    errorMessage.textContent = "Invalid Username or password. Please Try again";
                    errorMessage.style.display = "block";
                }
            }

                // Display an error message if there is an error in the try block
            catch (error) {
                console.error("[ERROR] Login failed", error);
            }
        })
    }

    // Create a function that displays images from a json file
    async function DisplayImages() {
        console.log("DisplayImages called");

        try {
            //Get the element in the images file gallery file that will be used to display elements
            let imageItems = document.querySelector(".carousel-inner");

            // Send a request to the images.json file that has the images
            const response = await fetch("data/images.json");

            // Display an error message if the response is not ok
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            // Assign the property to a variable
            const jsonData = await response.json();
            const images = jsonData.images;

            // Display an error message if the variable is not an array
            if (!Array.isArray(images)) {
                throw new Error("[ERROR] Json data does not contain a valid array")
            }

            // Loop through every content in the file
            images.forEach(image => {

                // Create an image element and set its attributes
                let img = document.createElement("img");
                img.setAttribute("class", "d-block w-100");
                img.setAttribute("src", image.src);
                img.setAttribute("alt", image.alt);

                // Create a div tag, set its attributes and add the img element to it
                let divTag = document.createElement("div");
                divTag.setAttribute("class", "carousel-item");
                divTag.appendChild(img);
                imageItems.appendChild(divTag);

                // Set the first image to active
                if (images.indexOf(image) === 0) {
                    divTag.classList.add("active");
                }
            })
        }
            // Display an error message if there is an error in the try block
        catch (error) {
            console.error("Error in DisplayImages:", error);
        }
    }

    // Create a function to display news on the main page
    async function DisplayNews() {

        // Set constants such as an apikey, url, country and so on
        const apiKey = "1375cb340e2e9fb4c1a6322cf27a404c";
        const country = "ca";
        const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=${country}`

        try {
            // Send a request to the URL
            const response = await fetch(url);

            // If the response is not ok, display and error message
            if (!response.ok) {
                throw new Error("Failed to fetch news data from mediastack.com.");
            }

            // Assigne the property to a variable
            const newsData = await response.json();
            console.log("News API Response: ", newsData);

            // Get the element where the news will be displayed
            const newsDataElement = document.getElementById("news");
            let htmlContent = '';

            // Loop through only two elements from the array
            for (let i = 0; i < 2; i++) {

                // Use the array keys to get the values and then display them in html tags
                const item = newsData.data[i];
                htmlContent += `<strong>Title: </strong> ${item.title} <br><br>
                                <strong>Description: </strong> ${item.description} <br><br>
                                <strong>Source: </strong> ${item.source} <br><br><br>`;
            }
            // Add the content to the news tag
            newsDataElement.innerHTML = htmlContent;
        }
            // Display an error if there was an issue in the try block
        catch (error) {
            console.error("Error fetching data", error);
            let errorMessage = document.getElementById("news");
            errorMessage.textContent = "Unable to contact and display the news at this time"
        }

    }

    //This function runs when the home page is loaded
    function DisplayHomePage() {
        console.log("Calling DisplayHomePage()...");

        // A function is added to the Get involved button on the home page. The function loads the
        //opportunities page
        let aboutUsBtn = document.getElementById("GetInvolvedBtn");
        aboutUsBtn.addEventListener("click", function () {
            location.href = "opportunities.html";
        });

        // Dynamically adding a donate link to the navbar

        let listItem = document.createElement("li");
        let link = document.createElement("a");
        listItem.setAttribute("class", "nav-item");
        link.setAttribute("class", "nav-link");
        link.setAttribute("href", "home.html");
        link.textContent = "Donate";
        listItem.appendChild(link);

        let headerNav = document.querySelector("ul");
        let login = document.getElementById("loginId");
        headerNav.insertBefore(listItem, login);
        DisplayNews();
    }

    //Function that is called when the About Us page is loaded
    function DisplayAboutPage() {
        console.log("Calling AboutUsPage()...");
    }

    // This function is called when the opportunities page loads
    function DisplayOpportunitiesPage() {

        // Changing the opportunities to Volunteer Now in the nav bar
        let newTerm = document.querySelector("#opportunities");
        newTerm.textContent = "Volunteer now";

        console.log("Calling DisplayOpportunitiesPage()...");

        // This is a javascript array that has information that will be displayed in the cards
        const volunteerJobs = [
            {
                title: "Tree Planting",
                Description: "Join Us as we connect to nature while nourishing it at the same " +
                    "time! ",
                Date: "20th January,2025",
                Time: "Time: 3:00pm"
            },
            {
                title: "Food bank", Description: "Help us cook food an prepare for those in need!",
                Date: "12th February,2025", Time: "Time: 9:00am"
            },
            {
                title: "Children Play Fair",
                Description: "Join Us, put a smile on little children's faces. Come spend a " +
                    "day with these delightful kids! Be the reason they smil today",
                Date: "19th February,2025",
                Time: "Time: 9:00am"
            },
            {
                title: "Community day",
                Description: " We love keeping the environment we stay in clean. We delight in it" +
                    "join us as we too!",
                Date: "27th February,2025",
                Time: "Time: 11:00am"
            },
            {
                title: "Bingo Night", Description: "Love seeing elderly smile? Be part of the reason they do. " +
                    "Join us for elderly bingo night!",
                Date: "1st March,2025", Time: "Time: 7:00pm"
            },
            {
                title: "Fair Day",
                Description: "Rides, Ponies, cotton candy, and puppies? Help us organize the fair of the century! " +
                    "Register today as a fair official",
                Date: "10th March,2025",
                Time: "Time: 10:00am"
            },
            {
                title: "Garage Sale",
                Description: "Join us for our garage sale. Help make it memorable for everyone involved " +
                    "the more the merrier!",
                Date: "19th March,2025",
                Time: "Time: 12:00pm"
            },
            {
                title: "Dogies Day Out",
                Description: "Love Animals? Take the shelter animals for a day out! They also deserve " +
                    "to play in the park",
                Date: "30th March, 2025",
                Time: "Time: 9:00am"
            }
        ]

        // Creating html elements for the opportunity card
        let DocumentBody = document.body;
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute("class", "container-fluid");

        let divTag1 = document.createElement("div");
        divTag1.setAttribute("class", "row");

        let count = 0;

        // Looping through each element in the array to display them on the cards
        for (let i = 0; i < volunteerJobs.length; i++) {
            count += 1;
            let row = volunteerJobs[i];
            let divTag2 = document.createElement("div");
            let divTag3 = document.createElement("div");
            let divTag4 = document.createElement("div");

            divTag2.setAttribute("class", "col-sm-6 col-md-4 col-lg-3");
            divTag3.setAttribute("class", "card bg-dark text-white");
            divTag4.setAttribute("class", "card-body");

            // Adding the information in the list to the card
            let heading = `<h5 class="card-title">${row.title}</h5>`;
            let description = `<p class="card-description">${row.Description}</p>`;
            let date = `<p>${row.Date}</p>`;
            let time = `<p>${row.Time}</p>`;

            // Creating a signup button for each card
            let button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn btn-primary SignUpBtn");
            button.setAttribute("id", "SignUpBtn");
            button.setAttribute("data-bs-toggle", "modal");
            button.setAttribute("data-bs-target", "#exampleModal");

            button.textContent = "Sign Up";

            divTag4.innerHTML += heading + description + date + time;
            divTag4.appendChild(button);
            divTag3.appendChild(divTag4);
            divTag2.appendChild(divTag3);
            divTag1.appendChild(divTag2);

            // Adding a break tag after every four cards
            if (count === 4 || count === 8) {
                let breakLine = document.createElement("br");
                let breakLine2 = document.createElement("br");

                divTag2.appendChild(breakLine);
                divTag2.appendChild(breakLine2);

                let submit = document.getElementById("submit");
                let fullNameValue = document.getElementById("fullName");
                let roleValue = document.getElementById("role");

                // Creating a constant for numbers
                const numberRegex = /^\d+$/;

                // Adding an event listener to the submit button on the modal form
                submit.addEventListener("click", function () {
                    // Displays an error message if there is a number in the name field
                    if ((numberRegex.test(fullNameValue.value))) {
                        window.alert("No numbers allowed in the full Name text box");
                    }
                    // Displays an error message if there is a number in the preferred role field
                    else if ((numberRegex.test(roleValue.value))) {
                        window.alert("No numbers allowed in the preferred role text box");
                    } else {
                        // Displays a message of confirmation if there are no errors
                        window.alert("Your information has been received! You can close all forms")
                    }
                })


            }
        }
        // Adds all the cards in the main div to the html body
        mainDiv.appendChild(divTag1);
        DocumentBody.appendChild(mainDiv);

    }

    // A function that is called when the Events page is loaded
    function DisplayEventsPage() {
        console.log("Calling DisplayEventsPage()...");

        // Getting the checkboxes
        let calendarCheckBx = document.getElementById("calendarCheckBox");
        let eventsCheckBx = document.getElementById("eventsCheckBox");
        let dateCheckBx = document.getElementById("DateCheckBox");
        let locationCheckBx = document.getElementById("LocationCheckBox");
        let events = document.getElementById("eventsDisplay");
        let calendar = document.getElementById("calendarDisplay");


        // Attach an event listener to the event click for the calendar check box
        calendarCheckBx.addEventListener("click", function () {
            // Reload the page if the calendar check box is checked
            if (calendarCheckBx.checked) {
                location.href = "./events.html";
            }
            // Hide the calendar and display the content for events when the events checkbox is checked
            else {
                calendar.style.display = "none";
                events.style.display = "block";
            }

        });
        // Attach an even listener to the events check box
        eventsCheckBx.addEventListener("click", function () {
            console.log("evenst cheh box clikced");
            LoadEventsType();
            calendar.style.display = "none";
        });

        dateCheckBx.addEventListener("click", function () {
            console.log("date check box clikced");
            LoadEventsDate();
            calendar.style.display = "none";
        });

        locationCheckBx.addEventListener("click", function () {
            console.log("date check box clikced");
            LoadEventsLocation();
            calendar.style.display = "none";
        })


    }

    // Function loads when the privacy policy page is loaded
    function DisplayPrivacyPolicyPage() {
        console.log("Calling DisplayPrivacyPolicyPage()...");
    }

    // Function loads contact page is loaded
    async function DisplayContactPage() {
        console.log("Calling DisplayContactPage()...");

        // Get the form elements
        let firstNameValue = document.getElementById("fName");
        let lastNameValue = document.getElementById("lName");
        let emailValue = document.getElementById("email");
        let subjectValue = document.getElementById("subject");

        let submitContactBtn = document.getElementById("submitContact");
        let submitFeedbackBtn = document.getElementById("submitFeedback");

        // Create a constant for a number format that will be used to check if there are numbers in the field
        const numberRegex = /^\d+$/;

        // Attach an event listener to the submit page
        submitContactBtn.addEventListener("click", function (event) {
            // Prevent the default action of the click event (which is reloading the page)
            event.preventDefault();

            // Display and error message if there is a number in the first name field box
            if ((numberRegex.test(firstNameValue.value))) {
                window.alert("No numbers allowed in the First Name text box");
            }

            // Display and error message if there is a number in the last name field box
            else if ((numberRegex.test(lastNameValue.value))) {
                window.alert("No numbers allowed in the Last Name text box");
            }

            // If everything is successfull, display a message and redirect to the home page
            else {
                let message = document.getElementById("message");
                let paragraph = document.createElement("p");
                paragraph.textContent = "Thank For Contacting Us! We shall get back to you shortly";
                message.appendChild(paragraph);

                // Redirect to the home page
                setTimeout(function () {
                    location.href = "./index.html";
                }, 5000);
            }
        })

        // Attach an event listener to te button that brings the feedback form
        submitFeedbackBtn.addEventListener("click", function (event) {
            event.preventDefault();

            // Create a constant tha will be used to check some inout has numbers
            const numberRegex = /^\d+$/;

            // Get the values in the field boxes
            let firstName = document.getElementById("firstName").value;
            let lastName = document.getElementById("lastName").value;

            // Display and error message if there is a number in the first name field box
            if ((numberRegex.test(firstName))) {
                window.alert("No numbers allowed in the First Name text box");
            }

            // Display and error message if there is a number in the last name field box
            else if ((numberRegex.test(lastName))) {
                window.alert("No numbers allowed in the Last Name text box");
            } else {
                // Create a request object
                let xhttp = new XMLHttpRequest();

                // Get the other values in the form
                let email = document.getElementById("emailAddress").value;
                let messageBox = document.getElementById("messageBox").value;

                // format the data for sending to the URL
                let content = "first_name=" + (firstName) + "&last_name=" + (lastName)
                    + "&email=" + (email) + "&message=" + (messageBox);

                // Create a function that is called each time the state of the object changes
                xhttp.onreadystatechange = function () {
                    // If the status and readystate are okay, display a message to the user
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            console.log(this.readyState);
                            console.log(this.status);
                            console.log("Data added successfully");
                            alert("Your feedback has been received!. Thank you.");
                        }
                        // If there was a network error, display a message to the user
                        else {
                            console.error("Error: " + this.statusText);
                            alert("Network Failure, Please try again later!");
                        }
                    }
                }
                // Open a post request to the website, in this case, formsspree
                xhttp.open("POST", "https://formspree.io/f/mjkglavw", true);

                // Tells the server that the request is a URL and accepts the response from the server
                xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhttp.setRequestHeader("Accept", "application/json");

                // Send the data to Form spree
                xhttp.send(content);
            }
        });
        // The else code(AJAX principles) is referenced from:
        //AJAX - Send a Request To a Server. W3schools. https://www.w3schools.com/Xml/ajax_xmlhttprequest_send.asp
        //AJAX - The XMLHttpRequest Object. W3schools. https://www.w3schools.com/Xml/ajax_xmlhttprequest_create.asp

        let feedBackForm = document.getElementById("feedBackForm");
        let contactForm = document.getElementById("contactForm");
        let feedBackBtn = document.getElementById("displayFeedBackForm");
        let contactBtn = document.getElementById("displayContactForm");
        feedBackBtn.addEventListener("click", function () {

            contactForm.style.display = "none";
            feedBackForm.style.display = "block";
        });

        contactBtn.addEventListener("click", function () {

            contactForm.style.display = "block";
            feedBackForm.style.display = "none";
        })
    }

    // Function is called when the terms of service page is loaded
    function DisplayTermsOfServicePage() {
        console.log("Calling DisplayTermsOfServicePage()...");
    }


    async function Start() {
        console.log("Starting...");
        console.log(`Current document title is ${document.title}`);

        // Call the login function
        CheckLogin();

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

    // Create switch statements that call different functions each time a different page is loaded
        switch(document.title){
            case "Home":
                DisplayHomePage();
                footer();
                break;
            case"About":
                DisplayAboutPage();
                footer();
                break;
            case"Contact":
                DisplayContactPage();
                footer();
                break;
            case"Events":
                DisplayEventsPage();
                break;
            case"Opportunities":
                DisplayOpportunitiesPage();
                footer();
                break;
            case"Login":
                DisplayLoginPage();
                footer();
                break;
            case"Privacy Policy":
                DisplayPrivacyPolicyPage();
                footer();
                break;
            case"Terms of Services":
                DisplayTermsOfServicePage();
                footer();
                break;
            case"Gallery":
                DisplayImages();
                footer();
                break;
        }
    }

    // Create a function for adding the footer
    function footer(){
        // Create a dynamic footer that has the terms of service and privacy policy page and it to the document
        let DocumentBody = document.body;
        let footer = document.createElement("footer");
        footer.setAttribute("class", "bg-dark text-center py-3");


        let footer1= `<a class="text-secondary" href="./privacypolicy.html">Privacy Policy</a><br>`;
        let footer2= `<a class="text-secondary" href="./termsofservice.html">Terms of Service</a>`;
        footer.innerHTML = footer1
        footer.innerHTML += footer2
        DocumentBody.appendChild(footer);
    }


    window.addEventListener("DOMContentLoaded", ()=>{
        console.log("DOM fully loaded and parsed");
        Start();
    });

})();