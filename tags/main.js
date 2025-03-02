let submitFeedbackBtn = document.getElementById("submitFeedback");

console.log("we are in the function")

// Attach an event listener to te button that brings the feedback form
submitFeedbackBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Create a constant tha will be used to check some inout has numbers
    const numberRegex = /^\d+$/;

    // Get the values in the field boxes
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = documeny.getElementById("emailAddress").value;
    let number = documeny.getElementById("number").value;
    let StartDate = documeny.getElementById("startDate").value;
    let EndDate = documeny.getElementById("endDate").value;
    let DateApplied = documeny.getElementById("dApplied").value;
    let DateReceived = documeny.getElementById("dReceived").value;

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
        // format the data for sending to the URL
        let content = "first_name=" + (firstName) + "&last_name=" + (lastName)
            + "&email=" + (email) + "&number=" + (number) + "&startdate=" + (StartDate) + "&enddate" + (EndDate)
            + "&dateapplied=" + (DateApplied) + "&datereceived" + (DateReceived);

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