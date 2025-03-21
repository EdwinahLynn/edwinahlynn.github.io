"use strict";

/**
 * Represents a event field with name, description, date, time and location
 */
(function (core) {
    class NewEvent {

        /**
         * Constructs a new Contact instance
         * @param eventName
         * @param eventDescription
         * @param eventDate
         * @param eventTime
         * @param eventLocation
         */
        constructor(eventName = "", eventDescription = "", eventDate = "", eventTime,
        eventLocation = "") {
            this._eventName = eventName;
            this._eventDescription = eventDescription;
            this._eventDate = eventDate;
            this._eventTime= eventTime;
            this._eventLocation = eventLocation;
        }

        /**
         * Gets the name of the event
         * @returns {string}
         */
        get eventName() {
            return this._eventName;
        }

        /**
         * Sets the name of the event. Validates input to make sure its a string and not empty
         * @param eventName
         */
        set eventName(eventName) {
            if (typeof eventName !== "string" || eventName.trim() === "") {
                throw new Error("Invalid event Name: must be non-empty string");
            }
            this._eventName = eventName;
        }

        /**
         * Gets the description of the event
         * @returns {string}
         */
        get eventDescription() {
            return this._eventDescription;
        }

        /**
         * Sets the description of the event. Validates input to make sure it's not empty
         * @param eventDescription
         */
        set eventDescription(eventDescription) {
            if (eventDescription.trim() === "") {
                throw new Error("Invalid Description: must not be empty");
            }
            this._eventDescription = eventDescription;
        }

        /**
         * Gets the date of the event
         * @returns {string}
         */
        get eventDate() {
            return this._eventDate;
        }

        /**
         * Sets the date of the event. Validates input to ensure it's not empty
         * @param eventDate
         */
        set eventDate(eventDate) {
            if (eventDate.trim() === "") {
                throw new Error("Invalid Date: must be non-empty string");
            }
            this._eventNDate = eventDate;
        }

        /**
         * Gets the time of the event
         * @returns {number}
         */
        get eventTime() {
            return this._eventTime;
        }

        /**
         * Sets the time of the event. Validates input to ensure it's a non-empty number
         * @param eventTime
         */
        set eventTime(eventTime) {
            if (typeof eventTime == "string" || eventTime.trim() === "") {
                throw new Error("Time cannot be empty or written as letters");
            }
            this._eventTime = eventTime;
        }

        /**
         * Gets the full location of the integer
         * @returns {string}
         */
        get eventLocation() {
            return this._eventLocation;
        }

        /**
         * Sets the location of the integer. Validates input to make sure its not empty
         * @param eventLocation
         */
        set eventLocation(eventLocation) {
            if (eventLocation.trim() === "") {
                throw new Error("Location cant be empty");
            }
            this._eventLocation = eventLocation;
        }


        toString() {
            return `Event Name: ${this._eventName}\nEvent Description: ${this._eventDescription}\nEvent Date: 
            ${this._eventDate}\nEvent Time: ${this._eventTime}\nEvent Location: ${this._eventLocation}`;
        }

        /**
         * Serializes the contact details into a string format suitable for storage
         * @returns {string|null}
         */
        serialize() {
            if (!this._eventName || !this._eventDescription || !this._eventDate || !this._eventTime||!this._eventLocation) {
                console.error("One of more of the event fields are missing");
                return null;
            }
            return `${this._eventName}, ${this._eventDescription}, ${this._eventDate}, ${this._eventTime}, ${this._eventLocation}`;
        }

        /**
         * Deserialize a string (comma-delimited) of contact details and update properties
         * @param eventsInfo
         */
        deserialize(eventsInfo) {
            if (typeof eventsInfo !== "string" || eventsInfo.split(",").length !== 5) {
                console.error("One or more of event fiels are invalid");
                return;
            }

            const eventArray = eventsInfo.split(",");
            this._eventName = eventArray[0];
            this._eventDescription = eventArray[1];
            this._eventDate = eventArray[2];
            this._eventTime = eventArray[3];
            this._eventLocation = eventArray[4];
        }
    }

    core.NewEvent = NewEvent;

})(core || (core = {}));