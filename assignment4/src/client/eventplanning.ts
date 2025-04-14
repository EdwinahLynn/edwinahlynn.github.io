"use strict";

/**
 * Represents an event field with name, description, date, time and location
 */

export class NewEvent {
    private _id: string;
    private _eventName: string;
    private _eventDescription: string;
    private _eventDate: string;
    private _eventTime: string;
    private _eventLocation: string;

    /**
     * Constructs a new Contact instance
     * @param id
     * @param eventName
     * @param eventDescription
     * @param eventDate
     * @param eventTime
     * @param eventLocation
     */
        constructor(id="", eventName = "", eventDescription = "", eventDate = "", eventTime = "",
        eventLocation = "") {
            this._id = id;
            this._eventName = eventName;
            this._eventDescription = eventDescription;
            this._eventDate = eventDate;
            this._eventTime= eventTime;
            this._eventLocation = eventLocation;
        }

    /**
     * Gets the id of the event
     * @returns {string}
     */
    get id():string {
        return this._id;
    }

    /**
     * Sets the id of the event
     * @param id
     */
    set id(id:string) {
        this._id = id;
    }

        /**
         * Gets the name of the event
         * @returns {string}
         */
        get eventName() {
            return this._eventName;
        }

        /**
         * Sets the name of the event. Validates input to make sure it's not empty
         * @param eventName
         */
        set eventName(eventName) {
            if (eventName.trim() === "") {
                throw new Error("Event Name must not be be empty");
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
                throw new Error("Description must not be empty");
            }
            this._eventDescription = eventDescription;
        }

        /**
         * Gets the date of the event
         * @returns {date}
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
                throw new Error("Date must not be empty");
            }
            this._eventDate = eventDate;
        }

        /**
         * Gets the time of the event
         * @returns {time}
         */
        get eventTime() {
            return this._eventTime;
        }

        /**
         * Sets the time of the event. Validates input to ensure it's not empty
         * @param eventTime
         */
        set eventTime(eventTime) {
            if (eventTime.trim() === "") {
                throw new Error("Time cannot be empty");
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
         * Sets the location of the integer. Validates input to make sure it's not empty
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
        serialize() : string{
            if (!this._eventName || !this._eventDescription || !this._eventDate || !this._eventTime || !this._eventLocation) {
                console.error("One of more of the event fields are missing");
            }
            return `${this._eventName}, ${this._eventDescription}, ${this._eventDate}, ${this._eventTime}, ${this._eventLocation}`;
        }

        /**
         * Deserialize a string that is comma separated
         * @param eventsInfo
         */
        deserialize(eventsInfo : string){
            if (eventsInfo.split(",").length !== 5) {
                console.error("One or more of event fields are invalid");
                return;
            }

            // Sets the class properties to the items in string after separating them based on commas
            const eventArray = eventsInfo.split(",");
            this._eventName = eventArray[0];
            this._eventDescription = eventArray[1];
            this._eventDate = eventArray[2];
            this._eventTime = eventArray[3];
            this._eventLocation = eventArray[4];
        }
    }


