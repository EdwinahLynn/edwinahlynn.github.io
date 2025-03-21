// Name: Edwinah Lynn Ninsiima
// Student ID: 1008884601
// Date: 25th/01/2024

"use strict";
import {Header} from "./header.js";
import {Router} from "./router.js";
import {AuthGuard} from "./authguard.js";
import {Footer} from "./footer.js";

const pageTitles = {
    "/": "Home",
    "/home": "Home",
    "/about": "About",
    "/contact": "Contact Us",
    "/eventplanning":"eventplanning",
    "/events": "Events",
    "/gallery": "Gallery",
    "/login": "Login Page",
    "/opportunities": "Opportunities",
    "/privacypolicy": "Privacy Policy",
    "/statistics": "Statistics",
    "/termsofservice": "Terms of Service",
    "/404": "Page Not Found"
};

const routes = {
    "/": "views/content/home.html",
    "/home": "views/content/home.html",
    "/about": "views/content/about.html",
    "/contact": "views/content/contact.html",
    "/eventplanning": "views/content/eventplanning.html",
    "/events": "views/content/events.html",
    "/gallery": "views/content/gallery.html",
    "/login": "views/content/login.html",
    "/opportunities": "views/content/opportunities.html",
    "/privacypolicy": "./views/content/privacypolicy.html",
    "/statistics": "views/content/statistics.html",
    "/termsofservice": "views/content/termsofservice/",
    "/404": "views/content/404.html",
};

export const router = new Router(routes);

// IIFE - Immediately Invoked Functional Expression
(function () {

    function DisplayEventsFromStorage() {
        console.log("Displaying Events from Storage....");
        if (localStorage.length > 0){
            let eventList = document.getElementById("forDisplayingEvents");
            let eventInformation = "";

            let keys = Object.keys(localStorage);
            console.log(keys);

            let index = 1;
            for (const key of keys){
                if(key.startsWith("event_")){
                    let eventData = localStorage.getItem(key);

                    try {
                        console.log(eventData);
                        let event = new core.NewEvent();
                        event.deserialize(eventData);

                        eventInformation += `
    
                                    <strong> Event Name : ${event.eventName}</strong>
                                    <p> Event Description : ${event.eventDescription}</p>
                                    <p> Event Date : ${event.eventDate}</p>
                                    <p> Event Time : ${event.eventTime}</p>
                                    <p> Event Location: ${event.eventLocation}</p>
                                     <button value="${key}" class="btn btn-danger btn-sm deleteEvent">
                                        <i class="fa-solid fa-trash"></i> Delete</i>
                                     </button>
                                    <br><br>
                                    `;
                        index++;
                    }
                    catch(error){
                        console.log(error)
                    }

                }
                else{
                    console.log("No keys found");
                }
                eventList.innerHTML = eventInformation;
            }
        }
        const deleteButtons = document.querySelectorAll("button.deleteEvent");
        deleteButtons.forEach( (button) => {
            button.addEventListener("click",function (event) {
                event.preventDefault();
                if (confirm("Do you want to delete this event?")) {
                    localStorage.removeItem(this.value);
                    DisplayEventsFromStorage();
                }
            });
        });
    }
    function DisplayEventPlanningPage(){

            let submitEventButton = document.getElementById("submitEvent");

            submitEventButton.addEventListener("click", (event) => {
                event.preventDefault();
                let eventName = document.getElementById("eName");
                let eventDate = document.getElementById("eDate");
                let eventDescription = document.getElementById("eDescription");
                let eventLocation = document.getElementById("eLocation");
                let eventTime = document.getElementById("eTime");

                let newEvent = new core.NewEvent(eventName.value, eventDescription.value, eventDate.value,
                    parseInt(eventTime.value), eventLocation.value);
                if(newEvent.serialize()){
                    // Primary key for a contact --> contact_ + date & time
                    let key =`event_${Date.now()}`;
                    localStorage.setItem(key, newEvent.serialize());
                    alert("The information about your event has been submitted");
                    DisplayEventsFromStorage();
                    eventTime.value = "";
                    eventDescription.value = "";
                    eventName.value = "";
                    eventDate.value = "";
                    eventLocation.value = "";
                    router.navigate("/eventplanning");
                }
                else{
                    console.error("[ERROR] Event serialization failed");
                }

            });

    }

    // Added a function to display charts on the statistic page
    async function DisplayStatistics() {
        console.log("Display StatisticsPage");
        const response = await fetch("data/statistics.json");
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        // Assign the json response to a variable
        const jsonData = await response.json();
        const statistics = jsonData.stats;
        console.log("here");
        console.log(statistics);

        const values = [];
        const labels = [];
        const colours = ["blue", "green","purple","pink","yellow", "brown", "black","grey", "orange", "indigo",
        "gold", "silver"];

        statistics.forEach((statistic) => {
            labels.push(statistic.month);
            values.push(parseInt(statistic.visitors, 10));
        });
        console.log(labels);
        console.log(values);

        new Chart("barChart", {
            type: "bar",
            data: {
                labels:labels,
                datasets: [{
                    backgroundColor: colours,
                    data:values}
                ]
            }
        });
        new Chart("pieChart", {
            type: "pie",
            data: {
                labels:labels,
                datasets: [{
                    backgroundColor: colours,
                    data:values}
                ]
            }
        });

        //Following code was referenced from;
            //Chart.js. w3schools. https://www.w3schools.com/js/js_graphics_chartjs.asp
    }

    // Create a function for loading events based on the event type
    async function LoadEventsType() {
        console.log("In EventsType...");

        // Check to see if the div tag is empty
        let divTag = document.getElementById("eventsDisplay");

        // Empty the div tag if it's not empty
        if (divTag.innerHTML !== "") {
            divTag.innerHTML = "";
        }
        console.log("LoadEvents Info");

        try {
            // Create a function to load the first event type(workshops) in the json file
            async function eventTypes(eventTitle, events) {

                // Create a heading tag and add it to the body
                let body = document.body;
                let heading = document.createElement("h2");
                heading.textContent = eventTitle;
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
    }

    // Create a function for loading events based on the date of the event
    async function LoadEventsDate() {

        // Check to see if the div tag is empty
        let mainDivTag = document.getElementById("eventsDisplay");

        // Empty the div tag if it's not empty
        if (mainDivTag.innerHTML !== "") {
            mainDivTag.innerHTML = "";
        }
        console.log("LoadEvents Info");

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
            mainDivTag.appendChild(heading);

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
                mainDivTag.appendChild(eventDateTime);
                mainDivTag.appendChild(eventName);
                mainDivTag.appendChild(eventDescription);
                mainDivTag.appendChild(location);


            });

        }
            // Display an error message if there is an error in the try block
        catch (error) {
            console.error("Error fetching events based on the date", error);
            let errorMessage = document.getElementById("eventsDisplay");
            errorMessage.textContent = "Unable to load events based on the date. Please try again later";
        }

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

            })
        }
            // Display an error message if there is an error in the try block
        catch (error) {
            console.error("Error fetching events data", error);
            let errorMessage = document.getElementById("eventsDisplay");
            errorMessage.textContent = "Unable to load events based on Location. Please try again later"
        }
        // Call the footer function
    }


    // Create a function to check if a user is logged in


    // Create a function for the login page
    function DisplayLoginPage() {
        console.log("Loading login page");
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
                    Header().then(() =>{
                        router.navigate("/home");
                    });
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
                console.log(image.alt);
                console.log(image.src);
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
        const apiKey = "ab3611c7e9b40fdd35eb3b491d703bd6";
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

    //document.addEventListener("DOMContentLoaded", DisplayOpportunitiesPage);
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
        //let DocumentBody = document.body;
        let divTag = document.getElementById("forOpportunities")
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
        divTag.appendChild(mainDiv);

    }

    //document.addEventListener("DOMContentLoaded", DisplayEventsPage);
    // A function that is called when the Events page is loaded
    async function DisplayEventsPage() {
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
                router.navigate("/events");
            }
            // Hide the calendar and display the content for events when the events checkbox is checked
            else {
                calendar.style.display = "none";
                events.style.display = "block";
            }

        });
        // Attach an even listener to the events check box
        eventsCheckBx.addEventListener("click", async function (event) {
            try {
                console.log("Date checkbox clicked");
                await LoadEventsType();
                calendar.style.display = "none";
            } catch (error) {
                console.error("Error in LoadDate:", error);
            }
        });

        dateCheckBx.addEventListener("click", async function() {
            console.log("date check box clicked");
            await LoadEventsDate();
            calendar.style.display = "none";
        });

        locationCheckBx.addEventListener("click", async function () {
            console.log("date check box clikced");
            await LoadEventsLocation();
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
        AuthGuard();
        console.log("Starting...");
        console.log(`Current document title is ${document.title}`);

        await Header();
        const currentPath =location.hash.slice(1) || "/";
        router.loadRoute(currentPath);
        await Footer();
        AuthGuard();


    }

    document.addEventListener("routeLoaded", (event) => {
        const newPath = event.detail; // extract the route from the event passed
        console.log(`[INFO] Route Loaded: ${newPath}`);

        Header().then(() => {
            handlePageLogic(newPath);
        });
        AuthGuard();
    });

    function handlePageLogic(path){
        switch(path){
            case "/":
                DisplayHomePage();
                break;
            case "/home":
                DisplayHomePage();
                break;
            case"/about":
                DisplayAboutPage();
                break;
            case"/contact":
                DisplayContactPage();
                break;
            case"/eventplanning":
                DisplayEventPlanningPage();
                DisplayEventsFromStorage();
                break;
            case"/events":
                DisplayEventsPage();
                break;
            case"/opportunities":
                DisplayOpportunitiesPage();
                break;
            case"/login":
                DisplayLoginPage();
                break;
            case"/privacypolicy":
                DisplayPrivacyPolicyPage();
                break;
            case"/statistics":
                DisplayStatistics();
                break;
            case"/termsofservice":
                DisplayTermsOfServicePage();
                break;
            case"/gallery":
                DisplayImages();
                break;
        }
    }

    window.addEventListener("DOMContentLoaded", ()=>{

        console.log("DOM fully loaded and parsed");
        Start();
    });

})();