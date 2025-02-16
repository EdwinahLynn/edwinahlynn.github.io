// Name: Edwinah Lynn Ninsiima
// Student ID: 1008884601
// Date: 25th/01/2024

"use strict";

// IIFE - Immediately Invoked Functional Expression

(function (){

    //This function runs when the home page is loaded
    function DisplayHomePage(){
        console.log("Calling DisplayHomePage()...");

        // A function is added to the Get involved button on the home page. The function loads the
        //opportunities page
        let aboutUsBtn = document.getElementById("GetInvolvedBtn");
        aboutUsBtn.addEventListener("click", function(){
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

        let headerNav = document.querySelector("ul" );
        headerNav.appendChild(link);

    }


    //Function that is called when the About Us page is loaded
    function DisplayAboutPage(){
        console.log("Calling AboutUsPage()...");
    }

    // This function is called when the opportunities page loads
    function DisplayOpportunitiesPage(){

        // Changing the opportunities to Volunteer Now in the nav bar
        let newTerm = document.querySelector("#opportunities");
        newTerm.textContent = "Volunteer now";

        console.log("Calling DisplayOpportunitiesPage()...");

        // This is a javascript array that has information that will be displayed in the cards
        const volunteerJobs=[
            {title:"Tree Planting", Description:"Join Us as we connect to nature while nourishing it at the same " +
                    "time! ",
                    Date:"20th January,2025", Time:"Time: 3:00pm"},
            {title:"Food bank", Description:"Help us cook food an prepare for those in need!",
                Date:"12th February,2025", Time:"Time: 9:00am"},
            {title:"Children Play Fair", Description:"Join Us, put a smile on little children's faces. Come spend a " +
                    "day with these delightful kids! Be the reason they smil today",
                Date:"19th February,2025", Time:"Time: 9:00am"},
            {title:"Community day", Description:" We love keeping the environment we stay in clean. We delight in it" +
                    "join us as we too!",
                Date:"27th February,2025", Time:"Time: 11:00am"},
            {title:"Bingo Night", Description:"Love seeing elderly smile? Be part of the reason they do. " +
                    "Join us for elderly bingo night!",
                Date:"1st March,2025", Time:"Time: 7:00pm"},
            {title:"Fair Day", Description:"Rides, Ponies, cotton candy, and puppies? Help us organize the fair of the century! " +
                    "Register today as a fair official",
                Date:"10th March,2025", Time:"Time: 10:00am"},
            {title:"Garage Sale", Description:"Join us for our garage sale. Help make it memorable for everyone involved " +
                    "the more the merrier!",
                Date:"19th March,2025", Time:"Time: 12:00pm"},
            {title:"Dogies Day Out", Description:"Love Animals? Take the shelter animals for a day out! They also deserve " +
                    "to play in the park",
                Date:"30th March, 2025", Time:"Time: 9:00am"}
        ]

        // Creating html elements for the opportunity card
        let DocumentBody = document.body;
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute("class", "container-fluid");

        let divTag1 = document.createElement("div");
        divTag1.setAttribute("class", "row");

        let count=0;

        // Looping through each element in the array to display them on the cards
        for (let i=0; i<volunteerJobs.length;i++ ) {
            count+=1;
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

            // Creating a sign up button for each card
            let button = document.createElement("button");
            button.setAttribute("type","button");
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
            if (count===4 || count===8){
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
                submit.addEventListener("click", function(){
                    // Displays an error message if there is a number in the name field
                    if ((numberRegex.test(fullNameValue.value))){
                        window.alert("No numbers allowed in the full Name text box");
                    }
                    // Displays an error message if there is a number in the preferred role field
                    else if ((numberRegex.test(roleValue.value))){
                        window.alert("No numbers allowed in the preferred role text box");
                    }
                    else{
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
    function DisplayEventsPage(){
        console.log("Calling DisplayEventsPage()...");

        // Getting the checkboxes
        let calendarCheckBx = document.getElementById("calendarCheckBox");
        let eventsCheckBx =document.getElementById("eventsCheckBox");
        let events = document.getElementById("eventsDisplay");
        let calendar = document.getElementById("calendarDisplay");


        // Attach an event listener to the event click for the calendar check box
        calendarCheckBx.addEventListener("click", function(){
            // Reload the page if the calendar check box is checked
            if (calendarCheckBx.checked){
                location.href = "./events.html";
            }
            // Hide the calendar and display the content for events when the events checkbox is checked
            else
            {
                calendar.style.display = "none";
                events.style.display = "block";
            }

        })

        // Attach an even listener to the events check box
        eventsCheckBx.addEventListener("click", function(){
            // Hide the events and display the calendar when the calendar checkbox is checked
            if (eventsCheckBx.checked){
                events.style.display = "block";
                calendar.style.display = "none";
            }
            // Reload the page if the calendar check box is checked
            else
            {
                location.href = "./events.html";
            }

        })

    }

    // Function loads when the privacy policy page is loaded
    function DisplayPrivacyPolicyPage(){
        console.log("Calling DisplayPrivacyPolicyPage()...");
    }

    // Function loads contact page is loaded
    function DisplayContactPage(){
        console.log("Calling DisplayContactPage()...");

        // Get the form elements
        let firstNameValue = document.getElementById("fName");
        let lastNameValue = document.getElementById("lName");
        let emailValue = document.getElementById("email");
        let subjectValue = document.getElementById("subject");
        let submitContactBtn = document.getElementById("submitContact");

        // Create a constant for a number format that will be used to check if there are numbers in the field
        const numberRegex = /^\d+$/;

        // Attach an event listener to the submit page
        submitContactBtn.addEventListener("click", function(){
            // Prevent the default action of the click event (which is reloading the page)
            event.preventDefault();

            // Display and error message if there is a number in the first name field box
            if ((numberRegex.test(firstNameValue.value)))
            {
                window.alert("No numbers allowed in the First Name text box");
            }

            // Display and error message if there is a number in the last name field box
            else if ((numberRegex.test(lastNameValue.value)))
            {
                window.alert("No numbers allowed in the Last Name text box");
            }

            // If everything is successfull, display a message and redirect to the home page
            else
            {
                let message = document.getElementById("message");
                let paragraph = document.createElement("p");
                paragraph.textContent="Thank For Contacting Us! We shall get back to you shortly";
                message.appendChild(paragraph);

                // Redirect to the home page
                setTimeout(function(){
                    location.href = "./index.html";
                    }, 5000);
            }
        })
    }

    // Function is called when the terms of service page is loaded
    function DisplayTermsOfServicePage(){
        console.log("Calling DisplayTermsOfServicePage()...");
    }



    // Create switch statements that call different functions each time a different page is loaded
    switch(document.title){
        case "Home":
            DisplayHomePage();
            break;
        case"About":
            DisplayAboutPage();
            break;
        case"Contact":
            DisplayContactPage();
            break;
        case"Events":
            DisplayEventsPage();
            break;
        case"Opportunities":
            DisplayOpportunitiesPage();
            break;
        case"Privacy Policy":
            DisplayPrivacyPolicyPage();
            break;
        case"Terms of Services":
            DisplayTermsOfServicePage();
            break;
    }

    // Create a dynamic footer that has the terms of service and privacy policy page and it to the document
    let DocumentBody = document.body;
    let footer = document.createElement("footer");
    footer.setAttribute("class", "bg-dark text-center py-3");


    let footer1= `<a class="text-secondary" href="./privacypolicy.html">Privacy Policy</a><br>`;
    let footer2= `<a class="text-secondary" href="./termsofservice.html">Terms of Service</a>`;
    footer.innerHTML = footer1
    footer.innerHTML += footer2
    DocumentBody.appendChild(footer);


})();