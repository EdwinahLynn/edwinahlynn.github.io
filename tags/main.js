"use strict";

(function () {
    function RegisterPage() {
        let submitButton = document.getElementById("submit");
        console.log("we are in the function")

    // Attach an event listener to te button that brings the feedback form
        submitButton.addEventListener("click", function (event) {
            event.preventDefault();

            // Create a constant tha will be used to check some inout has numbers
            const numberRegex = /^\d+$/;

            // Get the values in the field boxes
            let firstName = document.getElementById("firstName").value;
            let lastName = document.getElementById("lastName").value;
            let email = document.getElementById("emailAddress").value;
            let number = document.getElementById("number").value;
            let StartDate = document.getElementById("sDate").value;
            let EndDate = document.getElementById("eDate").value;
            let DateApplied = document.getElementById("dApplied").value;
            let DateReceived = document.getElementById("dReceived").value;

            // Display and error message if there is a number in the first name field box
            if ((numberRegex.test(firstName))) {
                window.alert("No numbers allowed in the First Name text box");
            }

            // Display and error message if there is a number in the last name field box
            else if ((numberRegex.test(lastName))) {
                window.alert("No numbers allowed in the Last Name text box");
            } else {
                // Get the selected value of the police check radio buttons
                let policeCheckSelected = document.querySelector('input[name="pCheck"]:checked');
                let PoliceCheckValue = policeCheckSelected ? policeCheckSelected.value : "No"; // Default to "No"
                // Create a request object
                let xhttp = new XMLHttpRequest();

                // Get the other values in the form
                // format the data for sending to the URL
                let content = "first_name=" + (firstName) + "&last_name=" + (lastName)
                    + "&email=" + (email) + "&number=" + (number) + "&startdate=" + (StartDate) + "&enddate=" + (EndDate)
                    + "&policecheck=" + (PoliceCheckValue)
                    + "&dateapplied=" + (DateApplied) + "&datereceived=" + (DateReceived);

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
                xhttp.open("POST", "https://formspree.io/f/manqrpqe", true);

                // Tells the server that the request is a URL and accepts the response from the server
                xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhttp.setRequestHeader("Accept", "application/json");

                // Send the data to Form spree
                xhttp.send(content);
            }
        });
    }
    function Start() {
        console.log("Starting...");
        console.log(`Current document title is ${document.title}`);

        switch(document.title){
            case "Register":
                RegisterPage();
                break;
        }
    }

    window.addEventListener("DOMContentLoaded", ()=>{
        console.log("DOM fully loaded and parsed");
        Start();
    });

})();