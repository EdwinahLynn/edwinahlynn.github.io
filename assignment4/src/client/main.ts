// Name: Edwinah Lynn Ninsiima
// Student ID: 1008884601
// Date: 25th/01/2024

"use strict";
// Import the important functions
import {Header, CheckLogin} from "./header.js";
import {Router} from "./router.js";
import {AuthGuard} from "./authguard.js";
import {Footer} from "./footer.js";
import {
    deletePost,
    fetchEvent,
    fetchPost,
    fetchUser,
    fetchUsers,
    postType,
    updateEvent,
    updatePosts
} from "./api/index.js";
import {
    createEvents,
    createPosts,
    createUsers,
    deleteEvent,
    deleteUserInfo,
    fetchEvents, fetchPosts,
    updateUserInfo
} from "./api/index.js";
import bcrypt from "bcrypt";


// Create the page titles for the paths
const pageTitles = {
    "/": "Home",
    "/accountpage": "View Account",
    "/home": "Home",
    "/about": "About",
    "/contact": "Contact Us",
    "/eventplanning":"eventplanning",
    "/events": "Events",
    "/gallery": "Gallery",
    "/login": "Login Page",
    "/new-account": "New Account",
    "/new-post": "New Post",
    "/opportunities": "Opportunities",
    "/posts": "Community Posts",
    "/privacypolicy": "Privacy Policy",
    "/statistics": "Statistics",
    "/termsofservice": "Terms of Service",
    "/update-event": "Update Event",
    "/404": "Page Not Found"
};


// Create the routes
const routes = {
    "/": "views/content/home.html",
    "/home": "views/content/home.html",
    "/about": "views/content/about.html",
    "/accountpage": "views/content/accountpage.html",
    "/contact": "views/content/contact.html",
    "/eventplanning": "views/content/eventplanning.html",
    "/events": "views/content/events.html",
    "/gallery": "views/content/gallery.html",
    "/login": "views/content/login.html",
    "/new-account": "views/content/new-account.html",
    "/new-post": "views/content/new-post.html",
    "/opportunities": "views/content/opportunities.html",
    "/posts": "views/content/posts.html",
    "/privacypolicy": "./views/content/privacypolicy.html",
    "/statistics": "views/content/statistics.html",
    "/termsofservice": "views/content/termsofservice/",
    "/update-event": "views/content/update-event.html",
    "/404": "views/content/404.html",
};

// Export the routes to other files
export const router = new Router(routes);

// IIFE - Immediately Invoked Functional Expression
(function () {

    async function DisplayPosts(){
        console.log("In display posts");

        let mainDiv = document.getElementById("forPosts");
        let rowDiv = document.getElementById("postsRow");
        if (!mainDiv){
            console.error("Main Div tag not found")
            return;
        }
        if (!rowDiv){
            console.error("Main Div tag not found")
            return;
        }
        if (mainDiv.innerHTML !==""){
            mainDiv.innerHTML = "";
            rowDiv.innerHTML = "";
        }

        const posts  = await fetchPosts();

        posts.forEach((post) => {
            let firstDiv = document.createElement("div");
            let secondDiv = document.createElement("div");
            let innerDiv = document.createElement("div");
            firstDiv.setAttribute("class", "col-sm-12 col-lg-6 p-2 my-3");
            secondDiv.setAttribute("class", "card bg-dark text-white");
            innerDiv.setAttribute("class", "card-body");

            let firstParagraph = document.createElement("p");
            firstParagraph.setAttribute("class", "card-header text-center");
            let secondParagraph = document.createElement("p");
            firstParagraph.innerHTML = post.postTitle;
            secondParagraph.innerHTML = post.postDescription;
            innerDiv.appendChild(firstParagraph);
            innerDiv.appendChild(secondParagraph);

            let updateButton = document.createElement("button");
            updateButton.textContent = "Update Post";
            updateButton.setAttribute("type", "button");
            updateButton.setAttribute("class", "btn btn-secondary btn-sm updatePost");
            updateButton.setAttribute("id", "updatePost");
            updateButton.setAttribute("value", post.id);

            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete Post";
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("class", "btn btn-danger mt-2 btn-sm d-flex justify-content-center deletePost");
            deleteButton.setAttribute("id", "deletePost");
            deleteButton.setAttribute("value", post.id);

            innerDiv.appendChild(updateButton);
            innerDiv.appendChild(deleteButton);
            secondDiv.appendChild(innerDiv);
            firstDiv.appendChild(secondDiv);
            rowDiv.appendChild(firstDiv);
            mainDiv.appendChild(rowDiv);

        });
    }

    async function DisplayCommunityPostsPage() {
        console.log("Display CommunityPostsPage");

        await DisplayPosts();

        document.querySelectorAll("button.deletePost").forEach((button) => {
            button.addEventListener("click", async function (event) {
                event.preventDefault();

                const deleteButton = event.target as HTMLButtonElement;
                const postId = deleteButton.value;

                if (confirm("Are yous sure you want to Delete this Post")) {
                    try{
                        console.log(postId);
                        await deletePost(postId);
                        await DisplayPosts();
                    }
                    catch(error){
                        console.error(`[ERROR] Failed to delete post:  ${error}`);
                    }
                }
            });
        });

        document.querySelectorAll("button.updatePost").forEach((button) => {
            button.addEventListener("click", async function (event) {
                event.preventDefault();
                const updateButton = event.target as HTMLButtonElement;
                const postId = updateButton.value;
                let form = document.getElementById("updateForm");
                if(!form){
                    console.log("Form is not found");
                    return;
                }
                form.style.display = "block";

                const posts  = await fetchPost(postId);
                let titlePostPage = document.getElementById("postTitleUpdate") as HTMLInputElement;
                let descriptionPostPage = document.getElementById("postDesUpdate") as HTMLInputElement;

                titlePostPage.value = posts.postTitle
                descriptionPostPage.value = posts.postDescription

                const updatePostButton = document.getElementById("postUpdate") as HTMLButtonElement;
                const cancelPostButton = document.getElementById("cancelPostUpdate") as HTMLButtonElement;
                if(!updatePostButton){
                    console.log("Update button not found");
                    return;
                }
                if(!cancelPostButton){
                    console.log("Cancel button not found");
                    return;
                }
                updatePostButton.addEventListener("click", async function (event) {
                    console.log("In seconf update button");
                    event.preventDefault();
                    let postTitle = (document.getElementById("postTitleUpdate") as HTMLInputElement).value.trim();
                    let postDescription = (document.getElementById("postDesUpdate") as HTMLInputElement).value.trim();
                    const updatedPost = {postTitle, postDescription};
                    await updatePosts(postId,updatedPost);
                    form.style.display = "none";
                    DisplayPosts();


                });
                cancelPostButton.addEventListener("click", async function (event) {
                    event.preventDefault();
                    form.style.display = "none";
                })

            });
        });


        const createPostButton = document.getElementById("createPost") as HTMLButtonElement;
        if (!createPostButton) {
            console.error("Button not found");
            return;
        }
        createPostButton.addEventListener("click", function () {
            router.navigate("/new-post");
        });
    }

    function DisplayNewPostPage(){
        console.log("Display NewPostPage");
        const newPostButton = document.getElementById("newPost") as HTMLButtonElement;
        const cancelPostButton = document.getElementById("cancelPost") as HTMLButtonElement;

        newPostButton.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("sup")
            const postTitle = (document.getElementById("postTitle") as   HTMLInputElement).value.trim();
            const postDescription = (document.getElementById("postDes") as HTMLInputElement).value.trim();

            const postInformation = {postTitle, postDescription};
            await createPosts(postInformation);

            router.navigate("/posts");
        });

        cancelPostButton.addEventListener("click", (event)=>{
            event.preventDefault();
            router.navigate("/posts");
        });
    }

    function DisplayNewAccountPage(){
        const createButton = document.getElementById("createAccount");
        if(!createButton){
            console.error("Create button not found");
            return;
        }
        createButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const displayName = (document.getElementById("DisplayNameNew") as HTMLInputElement).value.trim();
            const emailAddress = (document.getElementById("emailAddressNew") as HTMLInputElement).value.trim();
            const userName = (document.getElementById("userNameNew") as HTMLInputElement).value.trim();
            const password = (document.getElementById("passwordNew") as HTMLInputElement).value.trim();
            const newUserInfo = {displayName,emailAddress, userName, password};

            const userSession = sessionStorage.getItem("user");
            console.log(userSession);
            if (userSession) {
                sessionStorage.removeItem("user");
            }

            sessionStorage.setItem("user", JSON.stringify({
                DisplayName: displayName,
                Username: userName,
            }));
            console.log(userName);
            router.navigate("/");

            await createUsers(newUserInfo);
        });
    }

    async  function DisplayViewAccountPage(){
        const userSession = sessionStorage.getItem("user");

        if (userSession) {
            const userSessionInfo = JSON.parse(userSession);
            const displayNameSession = userSessionInfo.DisplayName;
            const userNameSession = userSessionInfo.Username;
            const users = await fetchUsers();
            console.log(users);
            const pageName = (document.getElementById("displayNameView") as HTMLInputElement);
            const pageEmail = (document.getElementById("emailAddressView") as HTMLInputElement);
            const pageUserName= (document.getElementById("userNameView") as HTMLInputElement);
            const pagePassword = (document.getElementById("passwordView") as HTMLInputElement);
            let id = null;

            for (const user of users) {
                if (user.userName === userNameSession && user.displayName === displayNameSession) {
                    const email = user.emailAddress;
                    const password = user.password;
                    pageName.value = displayNameSession;
                    pageEmail.value = email;
                    pageUserName.value = userNameSession;
                    pagePassword.value = "";
                    id = user.id;
                    console.log(id);
                }
            }
            if(!id){
                return;
            }
            const editButton = document.getElementById("editAccount") as HTMLButtonElement;
            const updateButton = document.getElementById("updateAccount") as HTMLButtonElement;
            const deleteButton = document.getElementById("deleteAccount") as HTMLButtonElement;
            if (!editButton) {
                console.log("Edit Button not found");
                return;
            }
            if (!updateButton) {
                console.log("Update Button not found");
                return;
            }
            if (!deleteButton) {
                console.log("Update Button not found");
                return;
            }

            editButton.addEventListener("click", async (event) => {
                event.preventDefault();
                pageName.disabled = false;
                pageEmail.disabled = false;
                pageUserName.disabled = false;
                pagePassword.disabled = false;
                updateButton.disabled = false;
                editButton.disabled = true;
            });

            updateButton.addEventListener("click", async (event) => {
                event.preventDefault();
                const displayName = pageName.value
                const emailAddress = pageEmail.value;
                const userName = pageUserName.value;
                const password = pagePassword.value;
                const updatedInfo = {displayName, emailAddress, userName, password};
                pageName.disabled = true;
                pageEmail.disabled = true;
                pageUserName.disabled = true;
                pagePassword.disabled = true;
                updateButton.disabled = true;
                editButton.disabled = false;
                updateButton.disabled = true;
                await updateUserInfo(id,updatedInfo);

                const userSessionInfo = JSON.parse(userSession);
                const displayNameSession = userSessionInfo.DisplayName;
                const userNameSession = userSessionInfo.Username;
                const response = await fetch("data/users.json");
                const users = await response.json();
                for (const user of users) {
                    if (user.Username === userNameSession && user.DisplayName === displayNameSession) {
                        const email = user.EmailAddress;
                        const password = user.Password;
                        pageName.value = displayName;
                        pageEmail.value = email;
                        pageUserName.value = userName;
                        pagePassword.value = password;
                    }
                }

            });

            deleteButton.addEventListener("click", async (event) => {
                event.preventDefault();
                if (confirm("Are You sure you want to delete your account?")) {
                    const userSession = sessionStorage.getItem("user");
                    if (userSession) {
                        sessionStorage.removeItem("user");
                    }
                    router.navigate("/login");
                    await deleteUserInfo(id);
                }

            });

        }


    }

    async function DisplayEditEventPage(id="") {
        if (id ===""){
            console.log("That id is empty")
            return;
        }

        const event = await fetchEvent(id);

        let name = (document.getElementById("uName") as HTMLInputElement);
        let date = (document.getElementById("uDate") as HTMLInputElement);
        let description = (document.getElementById("uDescription") as HTMLInputElement);
        let location = (document.getElementById("uLocation") as HTMLInputElement);
        let time = (document.getElementById("uTime") as HTMLInputElement);

        name.value = event.eventName;
        date.value = event.eventDate;
        description.value = event.eventDescription;
        location.value = event.eventLocation;
        time.value = event.eventTime;

        const submitButton = document.getElementById("submitUpdatedEvent")as HTMLButtonElement;
        const cancelButton = document.getElementById("cancelUpdateEvent") as HTMLButtonElement;

        submitButton.addEventListener("click", async (event) => {
            event.preventDefault();
            let eventName = (document.getElementById("uName") as HTMLInputElement).value;
            let eventDate = (document.getElementById("uDate") as HTMLInputElement).value;
            let eventDescription = (document.getElementById("uDescription") as HTMLInputElement).value;
            let eventLocation = (document.getElementById("uLocation") as HTMLInputElement).value;
            let eventTime = (document.getElementById("uTime") as HTMLInputElement).value;

            const updatedEvent = {eventName, eventDate, eventDescription, eventLocation, eventTime};
            await updateEvent(id, updatedEvent);
            router.navigate("/eventplanning");

        })

        cancelButton.addEventListener("click", async (event) => {
            event.preventDefault();
        })


    }

    // Create a function that displays events from the database
    async function DisplayEventsFromDatabase() {
        console.log("Displaying Events from Storage....");
        let idsList : any = [];

        try{
            let eventList: HTMLElement | null = document.getElementById("forDisplayingEvents");
            let eventInformation = "";


            // Display an error if the tag isn't found
            if (!eventList){
                console.log("No events found");
                return;
            }

            const events = await fetchEvents();
            console.log(events);

            events.forEach((event) => {
                // Add the information using HTML elements to the empty string
                eventInformation += `
                    <strong> Event Name : ${event.eventName}</strong>
                    <p> Event Description : ${event.eventDescription}</p>
                    <p> Event Date : ${event.eventDate}</p>
                    <p> Event Time : ${event.eventTime}</p>
                    <p> Event Location: ${event.eventLocation}</p>
                     <button value="${event.id}" class="btn btn-danger btn-sm deleteEvent">
                        <i class="fa-solid fa-trash"></i> Delete</i>
                     </button>
                      <button value="${event.id}" class="btn btn-secondary btn-sm updateEvent">
                        <i class="fa-solid fa-trash"></i> Update</i>
                     </button>
                    <br><br>
                            `;
                idsList.push(event.id);
            });
            eventList.innerHTML = eventInformation;
        }
        catch (error){
            console.log(`Error fetching contacts ${error}`);
        }

        document.querySelectorAll("button.deleteEvent").forEach((deleteButton) => {
            deleteButton.addEventListener("click", async function (event) {
                event.preventDefault()
                console.log("Delete button pressed");

                const Button = event.target as HTMLButtonElement;
                const eventId:string = Button.value;

                if (confirm("Delete contact, please confirm?")) {
                    try{
                        console.log(eventId);
                        await deleteEvent(eventId);
                        DisplayEventsFromDatabase();
                    }
                    catch(error){
                        console.error(`[ERROR] Failed to delete contact:  ${error}`);
                    }
                }
            });
        });

        document.querySelectorAll("button.updateEvent").forEach((updateButton) => {
            updateButton.addEventListener("click", async function (event) {
                console.log("Update button pressed");
                const Button = event.target as HTMLButtonElement;
                const eventId:string = Button.value;
                DisplayEditEventPage(eventId);
                router.navigate("/update-event");

            });
        });
    }

    // Create a function for the event planning page
    async function DisplayEventPlanningPage(){
        // Get the submit button from the event planning page and display and error if not found
        let submitEventButton:HTMLElement | null = document.getElementById("submitEvent");
        if (!submitEventButton){
            console.log("No submit button found");
            return;
        }

        // Attach an event handle to the submit button that send the client server
        submitEventButton.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("Form submitted");

            // Get the Form HTML Elements
            let eventName = (document.getElementById("eName") as HTMLInputElement).value.trim();
            let eventDate = (document.getElementById("eDate") as HTMLInputElement).value.trim();
            let eventDescription = (document.getElementById("eDescription") as HTMLInputElement).value.trim();
            let eventLocation = (document.getElementById("eLocation") as HTMLInputElement).value.trim();
            let eventTime = (document.getElementById("eTime") as HTMLInputElement).value.trim();

            // Pass the values of the element into the new event object created
            const newEvent = {eventName, eventDescription, eventDate, eventTime, eventLocation};
            await createEvents(newEvent);
            DisplayEventsFromDatabase();

            (document.getElementById("eName") as HTMLInputElement).value = "";
            (document.getElementById("eDate") as HTMLInputElement).value = "";
            (document.getElementById("eDescription") as HTMLInputElement).value = "";
            (document.getElementById("eLocation") as HTMLInputElement).value = "";
            (document.getElementById("eTime") as HTMLInputElement).value = "";

        });

    }

    // Added a function to display charts on the statistic page
    async function DisplayStatistics() :Promise<void> {
        // Create a Chart object
        const Chart =  (window as any).Chart;
        console.log("Display StatisticsPage");

        // Fetch the data from the statistics json file
        const response = await fetch("data/statistics.json");
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        // Assign the json response to a variable
        const jsonData = await response.json();
        const statistics = jsonData.stats;

        // Create empty arrays to hold the values in the json file and create an array of colours too
        const values : any = [];
        const labels: any = [];
        const colours:string[] = ["blue", "green","purple","pink","yellow", "brown", "black","grey", "orange", "indigo",
        "gold", "silver"];

        // Fos each value in the json file, add to the empty arrays
        statistics.forEach((statistic:any) => {
            labels.push(statistic.month);
            values.push(parseInt(statistic.visitors, 10));
        });

        // Create a bar chart and pass through it the labels, colours and values
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

        // Create a pie chart and pass through it the labels, colours and values
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
        let divTag = document.getElementById("eventsDisplay") as HTMLElement        ;

        // Empty the div tag if it's not empty
        if (divTag.innerHTML !== "") {
            divTag.innerHTML = "";
        }
        console.log("LoadEvents Info");

        try {
            // Create a function to load the first event type(workshops) in the json file
            async function eventTypes(eventTitle:any, events : any){

                // Create a heading tag and add it to the body
                let body = document.body;
                let heading = document.createElement("h2");
                heading.textContent = eventTitle;
                divTag.appendChild(heading);


                // Create a loop to run through the elements in the json file
                events.forEach((event:any) => {
                    console.log("in the loop");

                    // Create paragraph elements for the information in the json file
                    let eventName = document.createElement("p")as HTMLParagraphElement;
                    let eventDescription = document.createElement("p") as HTMLParagraphElement;
                    let eventDateTime = document.createElement("p") as HTMLParagraphElement;
                    let location = document.createElement("p") as HTMLParagraphElement;
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
            if(!errorMessage){
                console.log("Error Message tag not found");
                return;
            }
            errorMessage.textContent = "Error: Cannot display this information now. Try again later";
        }
    }

    // Create a function for loading events based on the date of the event
    async function LoadEventsDate() {

        // Check to see if the div tag is empty
        let mainDivTag = document.getElementById("eventsDisplay") as HTMLElement;

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
            if(!errorMessage){
                console.log("Error Message tag not found");
                return;
            }
            errorMessage.textContent = "Unable to load events based on the date. Please try again later";
        }

    }

    // Create a function for loading events based on the location for the event
    async function LoadEventsLocation() {

        // Check to see if the div tag is empty
        let divTag = document.getElementById("eventsDisplay") as HTMLElement;

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
            if(!errorMessage){
                console.log("Error, Message tag not found");
                return;
            }
            errorMessage.textContent = "Unable to load events based on Location. Please try again later"
        }
        // Call the footer function
    }


    // Create a function to check if a user is logged in


    // Create a function for the login page
    async function DisplayLoginPage():Promise<void> {
        console.log("Loading login page");

        // Get the login button and attach an event listener to it
        let loginButton = (document.getElementById("loginButton")as HTMLButtonElement);
        let newUserAccount = (document.getElementById("account") as HTMLButtonElement);

        if(!newUserAccount){
            return;
        }
        newUserAccount.addEventListener("click", async () => {
            router.navigate("/new-account");
        })

        if (!loginButton) {
            console.error("Login button not found");
            return;
        }
        loginButton.addEventListener("click", async (event:MouseEvent)=> {
            event.preventDefault();

            // Get the values in the username and password field boxes
            const username = (document.getElementById("userName") as HTMLInputElement).value.trim();
            const password =( document.getElementById("password") as HTMLInputElement).value.trim();
            const email =( document.getElementById("emailAddress") as HTMLInputElement).value.trim();

            try {

                // Send a request to the users.json file in the data folder
                const users = await fetchUsers();

                // Display an error message if the variable is not an array
                if (!Array.isArray(users)) {
                    throw new Error("[ERROR] Json data does not contain a valid array")
                }

                // Declare and assign values to variables that will help with session information
                let isMatch = false;
                console.log(email);
                console.log(username);

                // Loop through the array and check if the information entered matches any in the file
                for (const user of users) {
                    console.log(user.userName);
                    console.log(user.emailAddress)
                    if (user.userName === username && user.emailAddress === email) {
                        console.log(user.userName);
                        console.log(user.password);
                        const textPassword = await fetchUser(user.id, password);
                        console.log(textPassword);
                        if(textPassword){
                            // If there are values that match, set isMatch to true and assign that user to the session user variable
                            isMatch = true;
                            // Using the key word user, place the user into that session
                            sessionStorage.setItem("user", JSON.stringify({
                                DisplayName: user.displayName,
                                Username: user.userName,
                            }));
                            break;
                        }
                        else{
                            isMatch = false;
                            let errorMessage = document.getElementById("errorMessage");
                            if (errorMessage){
                                errorMessage.classList.add("alert", "alert-danger");
                                errorMessage.textContent = "Password. Please Try again";
                                errorMessage.style.display = "block";}
                        }


                    }
                }
                console.log(isMatch);

                // If there was a match from the array
                if (isMatch) {
                    // Redirect to the main page
                    Header().then(() =>{
                        router.navigate("/home");
                    });
                }

                // If there were no matched from the array, display error messages
                else {
                    let errorMessage = document.getElementById("errorMessage");
                    if (errorMessage){
                    errorMessage.classList.add("alert", "alert-danger");
                    errorMessage.textContent = "Invalid Username";
                    errorMessage.style.display = "block";}
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
            let imageItems = document.querySelector(".carousel-inner") as HTMLElement;

            // Send a request to the images.json file that has the images
            const response = await fetch("../data/images.json");

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
    async function DisplayNews(){

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
            if (!newsDataElement) {
               console.error("No news tag found for news.");
               return;
            }
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
            if (!errorMessage) {
                console.error("No message tag found for news.");
                return;
            }
            errorMessage.textContent = "Unable to contact and display the news at this time"
        }

    }

    //This function runs when the home page is loaded
    function DisplayHomePage() {
        console.log("Calling DisplayHomePage()...");

        // A function is added to the Get involved button on the home page. The function loads the
        //opportunities page
        let aboutUsBtn = document.getElementById("GetInvolvedBtn");
        if(!aboutUsBtn){
            console.log("Button not found");
            return;
        }
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

        let headerNav = document.querySelector("ul") as HTMLUListElement | null;
        let login = document.getElementById("loginId") as HTMLElement | null;
        if (!headerNav) {
            console.error("Header Nav not found");
            return;
        }
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
        if(!newTerm) {
            console.log ("opportunities tag not found");
            return;
        }
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
        let divTag = document.getElementById("forOpportunities");
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

                let submit = document.getElementById("submit") as HTMLButtonElement;
                let fullNameValue = document.getElementById("fullName") as HTMLInputElement;
                let roleValue = document.getElementById("role") as HTMLInputElement;

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
        if (!divTag) {
            console.log("Div tag not found");
            return;
        }
        divTag.appendChild(mainDiv);

    }

    //document.addEventListener("DOMContentLoaded", DisplayEventsPage);
    // A function that is called when the Events page is loaded
    async function DisplayEventsPage() {
        console.log("Calling DisplayEventsPage()...");

        // Getting the checkboxes
        let calendarCheckBx = document.getElementById("calendarCheckBox") as HTMLFormElement;
        let eventsCheckBx = document.getElementById("eventsCheckBox") as HTMLFormElement;
        let dateCheckBx = document.getElementById("DateCheckBox") as HTMLFormElement;
        let locationCheckBx = document.getElementById("LocationCheckBox") as HTMLFormElement;
        let events = document.getElementById("eventsDisplay") as HTMLElement ;
        let calendar = document.getElementById("calendarDisplay") as HTMLElement;


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
        let firstNameValue = document.getElementById("fName") as HTMLInputElement;
        let lastNameValue = document.getElementById("lName") as HTMLInputElement;
        let emailValue = document.getElementById("email");
        let subjectValue = document.getElementById("subject");

        let submitContactBtn = document.getElementById("submitContact") as HTMLButtonElement;
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
                if(!message){
                    console.log("Message tag not found");
                    return;
                }
                let paragraph = document.createElement("p");
                paragraph.textContent = "Thank For Contacting Us! We shall get back to you shortly";
                message.appendChild(paragraph);

                // Redirect to the home page
                setTimeout(function () {
                    location.href = "./index.html";
                }, 5000);
            }
        })
        if (!submitFeedbackBtn) {
            console.log("Submit button not found");
            return;
        }

        // Attach an event listener to te button that brings the feedback form
        submitFeedbackBtn.addEventListener("click", function (event) {
            event.preventDefault();

            // Create a constant tha will be used to check some inout has numbers
            const numberRegex = /^\d+$/;

            // Get the values in the field boxes
            let firstName = (document.getElementById("firstName") as HTMLInputElement).value;
            let lastName = (document.getElementById("lastName") as HTMLInputElement).value;

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
                let email = (document.getElementById("emailAddress") as HTMLInputElement).value;
                let messageBox = (document.getElementById("messageBox") as HTMLInputElement).value;

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

        let feedBackForm = document.getElementById("feedBackForm") as HTMLFormElement;
        let contactForm = document.getElementById("contactForm") as HTMLFormElement;
        let feedBackBtn = document.getElementById("displayFeedBackForm") as HTMLButtonElement;
        let contactBtn = document.getElementById("displayContactForm") as HTMLButtonElement;
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
        // Calls the AuthGuard function to check if the user has access to the pages
        AuthGuard();
        console.log("Starting...");

        // Load the header, footer and pass the path to the load route function that loads the HTML content
        await Header();
        const currentPath =location.hash.slice(1) || "/";
        router.loadRoute(currentPath);
        await Footer();
        AuthGuard();


    }

    // Runs when a new route is loaded
    document.addEventListener("routeLoaded", (event:Event) => {

        // Extracts data from the event
        const otherEvent = event as CustomEvent
        const newPath = otherEvent.detail;
        console.log(`[INFO] Route Loaded: ${newPath}`);

        // Loads the header then calls the handle page logic function that calls the different tailored page functions
        Header().then(() => {
            handlePageLogic(newPath);
        });
        // Check if the user is authorized again
        AuthGuard();
    });

    async function handlePageLogic(path: string) {
        // This calls the functions based on what path is passed
        switch (path) {
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
                DisplayEventsFromDatabase();
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
            case"/accountpage":
                DisplayViewAccountPage();
                break;
            case"/new-account":
                DisplayNewAccountPage();
                break;
            case"/posts":
                DisplayCommunityPostsPage();
                break;
            case"/new-post":
                DisplayNewPostPage();
                break;
            case"/update-event":
                DisplayEditEventPage();
                break;

        }
    }

    // Calls the Start function when the page is loaded
    window.addEventListener("DOMContentLoaded", ()=>{
        console.log("DOM fully loaded and parsed");
        Start();
    });

})();