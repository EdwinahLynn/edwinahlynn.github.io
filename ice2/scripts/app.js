"use strict";



// IIFE - Immediately Invoked Functional Expression

(function (){

    async function LoadHeader(){
        console.log("[INFO] Loading header");

        return fetch("header.html")
            .then(response => response.text())
            .then(data => {
            document.querySelector("header").innerHTML = data;
            updateActiveNewLink();
            })
            .catch(error =>{
                console.log("[ERROR] Unable to load header");
            })
    }

    function CheckLogin(){
        console.log("[INFO] Checking user login status..");

        const loginNav = document.getElementById("login");

        if(!loginNav){
            console.warn("[WARNING] LoginNav element not found! Skipping CheckLogin().");
            return;
        }

        const userSession = sessionStorage.getItem("user");

        if(userSession){
            loginNav.innerHTML = `<i class = "fas fa-sign-out-alt"></i> Logout`;
            loginNav.href = "#";

            loginNav.addEventListener("click", (event) =>{
                event.preventDefault();
                sessionStorage.removeItem("user");
                location.href = "login.html";
            })
        }

    }

    function updateActiveNewLink(){
        console.log("[INFO] Updating active nav link...");

        const currentPage = document.title.trim();
        const navLinks = document.querySelectorAll("nav a");

        navLinks.forEach((link) => {
            if (link.textContent === currentPage) {
                link.classList.add("active");
            }
            else
            {
                link.classList.remove("active");
            }
        })
    }

    /**
     * Dynamically load the header from the header.html into the current page.
     */

    function DisplayLoginPage(){
        console.log("[INFO] DisplayLoginPage called ...");

        const messageArea = document.getElementById("messageArea");
        const loginButton = document.getElementById("loginButton");
        const cancelButton = document.getElementById("cancelButton");

        //messageArea
        messageArea.style.display = "none";

        if (!loginButton){
            console.error("[ERROR] Unable to login Button not found");
            return;
        }

        loginButton.addEventListener("click",  async(event) =>{
            event.preventDefault();

            // retrieve passed in form parameters
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            try{

                // The await keyword tells JavaScript to pause here (thread) until the fetch request
                const response = await fetch("data/user.json");

                if (!response.ok){
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const jsonData  = await response.json();
                // console.log("[DEBUG] Fetched JSON Data:", jsonData);

                const users = jsonData.users;

                if(!Array.isArray(users)){
                    throw new Error("[ERROR] Json data does not contain a valid array")
                }

                let success = false;
                let authenticatedUser = null;

                for(const user of users){
                    if(user.Username === username && user.Password === password){
                        success = true;
                        authenticatedUser = user;
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user", JSON.stringify({
                       DisplayName: authenticatedUser.DisplayName,
                       EmailAddress: authenticatedUser.EmailAddress,
                        Username: authenticatedUser.Username,

                    }));

                    messageArea.classList.remove("alert", "alert-danger");
                    messageArea.style.display = "none";
                    location.href = "contact-List.html";
                }
                else{
                    messageArea.classList.add("alert", "alert-danger");
                    messageArea.textContent = "Invalid Username or password. Please Try again";
                    messageArea.style.display = "block";

                    document.getElementById("username").focus();
                    document.getElementById("username").select();

                }
            } catch(error){
               console.error("[ERROR] Login failed", error);
            }

        });

        cancelButton.addEventListener("click",  (event) => {
            document.getElementById("loginForm").reset();
            location.href = "index.html";
        });

    }

    function DisplayRegisterPage(){
        console.log("[INFO] DisplayRegisterPage called ...");
    }

    /**
     * Redirect the user back to contact-list.html
     */
    function handleCancelClick(){
        location.href = "contacts.html";
    }

    /**
     * Handle the process of editing an existing contact
     * @param event
     * @param contact
     * @param page
     */

    function handleEditClick(event, contact, page) {

        // prevent default form submission
        event.preventDefault();

        if(!validateForm()){
            alert("Invalid data! Please check your inputs");
            return;
        }
        const fullName = document.getElementById("fullName").value;
        const contactNumber = document.getElementById("contactNumber").value;
        const emailAddress = document.getElementById("emailAddress").value;

        contact.fullName = fullName;
        contact.contactNumber = contactNumber;
        contact.emailAddress = emailAddress;

        // Save the update contact back to local storage (csv format)
        localStorage.setItem(page, contact.serialize());

        // redirect
        location.href = "contact-list.html";
    }

    /**
     * Handles the process of adding a new contact
     * @param event -  the event 0bject to prevent default form submission
     */
    function handleAddClick(event){

        // prevent form default form submission
        event.preventDefault();

        if(!validateForm()){
            alert("Form Contains errors. Please correct them before submitting.");
            return;
        }
        const fullName = document.getElementById("fullName").value;
        const contactNumber = document.getElementById("contactNumber").value;
        const emailAddress = document.getElementById("emailAddress").value;

        // Create and save new contact
        AddContact(fullName,contactNumber,emailAddress);
        location.href="contact-list.html";

    }

    function addEventListenerOnce(elementId, event, handler){

        // Retrieve the element from the DOM
        const element = document.getElementById(elementId);

        if (element) {
            //element.removeEventListener(event, handler);
            element.addEventListener(event, handler);
        }
        else{
            console.warn(`[WARN Element with ID '${elementId}' not found.`);
        }

    }

    /**
     * validate the entire form by checking the validity of each input field
     * @return{boolean}-return true if all fields pass validation, false otherwise
     */
    function validateForm() {
        return (
            validateInput("fullName")&&
                validateInput("contactNumber")&&
                    validateInput("emailAddress")
        );

    }

    /**
     * Validate an input field based on predefined validation rules
     * @param fieldId
     * @returns {boolean}
     */
    function validateInput(fieldId){
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        const rule = VALIDATION_RULES[fieldId];

        if (!field ||!errorElement || !rule){
            console.warn(`[WARN] Validation rule not found ${fieldId}`);
            return false;
        }

        // Test 1: for empty value
        if(field.value.trim() === ""){
            errorElement.textContent = rule.errorMessage;
            errorElement.style.display = "block";
            return false;
        }

        // Test 2: Check if input fails to match the regex pattern
        if (!rule.regex.test(field.value)){
            console.log(`${fieldId} failed regex validation!`);
            errorElement.textContent = rule.errorMessage;
            errorElement.style.display = "block";
            return false;
        }

        // Clear the error message
        errorElement.textContent = "";
        errorElement.style.display = "none";
        return true;
    }

    function attachValidationListeners() {
        console.log("[INFO] Attaching Validation Listeners");

        Object.keys(VALIDATION_RULES).forEach((fieldId) =>{

            const field = document.getElementById(fieldId);
            if (!fieldId){
                console.warn("[WARNING] field '${fieldId' not found. Skipping Listener attachment'");
                return;
            }

            // attach event listener using a centralised validator
            addEventListenerOnce(fieldId, "input", ()=> validateInput(fieldId));
        });
    }

    /**
     *  Centralized validation rules for form input fields
     * @type {{fullName: {regex: RegExp, errorMessage: string}, contactNumber: {regex: RegExp, errorMessage: string}, emailAddress: {regex: RegExp, errorMessage: string}}}
     */
    const VALIDATION_RULES = {
        fullName: {
            regex: /^[A-Za-z\s]+$/, //allows for only letters and spaces
            errorMessage: "Full Name must contain only letters and spaces."
        },
        contactNumber:{
            regex: /^\d{3}-\d{3}-\d{4}$/,
            errorMessage: "Contact Number must contain numbers in the format ###-###-####"
        },
        emailAddress:{
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: "Invalid email address format"
        }
    }

    function AddContact(fullName, contactNumber, emailAddress){

        console.log("[DEBUG] AddContact() triggered... ");

        if (!validateForm()){
            alert("Form contains errors. Please correct them before submitting.");
            return;
        }

        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            // Primary key for a contact --> contact_ + date & time
            let key =`contact_${Date.now()}`;
            localStorage.setItem(key, contact.serialize());
        }
        else{
            console.error("[ERROR] Contact serialization failed");
        }

        // Redirects the user after successful contact addition
        location.href = "contact-list.html";
    }

    function DisplayEditPage(){
        console.log("DisplayEditPage() Called");
        const page = location.hash.substring(1);
        const editButton = document.getElementById("editButton");

        switch(page){
            case "add":
            {
                document.title = "Add Contact";
                //Add Contact
                const heading = document.querySelector("main>h1").textContent="Add Contact";

                if(editButton){
                    //Update h1 heading
                    editButton.innerHTML = `<i class="fa-solid fa-user-plus fa-sm"></i>Add`;
                    editButton.classList.remove("btn-primary");
                    editButton.classList.add("btn-success");
                }

                addEventListenerOnce("editButton", "click", handleAddClick);
                addEventListenerOnce("cancelButton", "click", handleCancelClick);

                break;
            }


            default:
            {
                //Edit Contact
                const contact = new core.Contact();
                const contactData = localStorage.getItem(page);

                if (contactData) {
                    contact.deserialize(contactData);

                    document.getElementById("fullName").value = contact.fullName;
                    document.getElementById("contactNumber").value = contact.contactNumber.trim();
                    document.getElementById("emailAddress").value = contact.emailAddress;

                    if (editButton){
                        //Update h1 heading
                        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>Edit`;
                        editButton.classList.remove("btn-primary");
                        editButton.classList.add("btn-success");
                    }

                    addEventListenerOnce("editButton", "click",
                        (event)=> handleEditClick(event,contact,page));
                    addEventListenerOnce("cancelButton", "click", handleCancelClick);

                    break;

                }
            }

        }
    }

    async function DisplayWeather(){

        const apiKey = "f84e8c12079732e9c9dd4d9d77f45182";

        const city = "Kampala";

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try{
           const response = await fetch(url);

           // 200 OK
           if (!response.ok) {
               throw new Error("Failed to fetch weather data from openweathermap.org.");
           }
           const data = await response.json();
           console.log("Weather API Response: ", data);

           const weatherDataElement= document.getElementById("weather-data");

           weatherDataElement.innerHTML = `<strong>City: </strong> ${data.name} <br>
                                            <strong>Temperature: </strong> ${data.main.temp}<br>
                                            <strong>Weather: </strong> ${data.weather[0].description}`;
        }

        catch (error) {
            console.error("Error fetching data", error);
            document.getElementById("weather-data").textContent = "Unable to contact weather at this time";
        }
    }

    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage()");

        if (localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);
            console.log(keys);

            let index = 1;
            for (const key of keys){

                if(key.startsWith("contact_")){
                    let contactData = localStorage.getItem(key);
                    console.log("Called DisplayContactListPage()")

                    try{
                        console.log(contactData);
                        let contact = new core.Contact();
                        contact.deserialize(contactData);   //deserialize contact csv to contact object

                        data += `<tr>
                                    <th scope="row" class="text-center">${index}</th>
                                     <td>${contact.fullName}</td>
                                     <td>${contact.contactNumber}</td>
                                     <td>${contact.emailAddress}</td>
                                     <td class="text-center">
                                        <button value="${key}" class="btn btn-warning btn-sm edit">
                                        <i class="fa-solid fa-pen-to-square"></i></i>Edit</i>
                                        </button>
                                     </td>
                                     <td>
                                        <button value="${key}" class="btn btn-danger btn-sm delete">
                                        <i class="fa-solid fa-trash"></i> Delete</i>
                                        </button>
                                        </td>
                                </tr>`;
                        index++;
                    }
                    catch(error){
                       console.error("Error deserializing contact data");
                    }
                }
                else
                {
                  console.warn("Skipping non-contact key");
                }
            }
            contactList.innerHTML=data;
        }

        const addButton = document.getElementById("addButton");
        if (addButton){
            addButton.addEventListener("click",() => {
                location.href="./edit.html#add";
            });
        }

        const deleteButtons = document.querySelectorAll("button.delete");
        deleteButtons.forEach( (button) => {
            button.addEventListener("click",function () {
                if (confirm("Delete contact, please confirm?")) {
                    localStorage.removeItem(this.value);
                    location.href="contact-list.html";
                }
            });
        });

        const editButtons = document.querySelectorAll("button.edit");
        editButtons.forEach( (button) => {
            button.addEventListener("click",function () {
                // Concatenate the value from the edit link to the edit/html#{key}
                location.href="edit.html#" + this.value;
            });
        });

    }

    function DisplayHomePage(){
        console.log("Calling Display Home Page()...");

        let aboutUsBtn = document.getElementById("AboutUsBtn");


        // Arrow notation
        aboutUsBtn.addEventListener("click", () => {
            location.href = "about.html";
        });

        // Add call to weathermap.org.
        DisplayWeather();


        // Add content to the main element in index.html
        document.querySelector("main").insertAdjacentHTML(
            "beforeend",
            `<p id="MainParagraph" class="mt-3">This is my first paragraph</p>`
        )

        // Add article with paragraph to the body
        document.body.insertAdjacentHTML(
            "beforeend",
            `<article class="container">
                  <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>
                  </article>`
        )

    }

    function DisplayAboutPage(){
        console.log("Calling AboutUsPage()...");
    }

    function DisplayProductsPage(){
        console.log("Calling DisplayProductsPage()...");
    }

    function DisplayServicesPage(){
        console.log("Calling DisplayServicesPage()...");
    }

    function DisplayContactPage(){
        console.log("Calling DisplayContactPage()...");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckBox");

        sendButton.addEventListener("click", function(){

           if(!validateForm()){
               alert("Please fix your errors before submitting");
               return;
           }

            if (subscribeCheckbox.checked){

                AddContact(
                    document.getElementById("fullName").value,
                    document.getElementById("contactNumber").value,
                    document.getElementById("emailAddress").value,
                );

            }

            alert("Form submitted successfully");

        });
    }

    async function Start()
    {
        console.log("Starting...");
        console.log(`Current document title is ${document.title}`);

        // Load NavBar
        await LoadHeader().then( () =>{
            CheckLogin();
    });


        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case"About":
                DisplayAboutPage();
                break;
            case"Products":
                DisplayProductsPage();
                break;
            case"Services":
                DisplayServicesPage();
                break;
            case"Contact":
                attachValidationListeners();
                DisplayContactPage();
                break;
            case"Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                attachValidationListeners();
                DisplayEditPage()
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;

            default:
                console.error("No matching case for the page title");
                break;
        }
    }

    window.addEventListener("DOMContentLoaded", ()=>{
        console.log("DOM fully loaded and parsed");
        Start();
    });
})();





