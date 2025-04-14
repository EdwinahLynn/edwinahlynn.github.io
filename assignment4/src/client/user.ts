"use strict";


/**
 * Represents an event field with name, description, date, time and location
 */

export class NewUser {
    private _id: string;
    private _displayName: string;
    private _emailAddress: string;
    private _userName: string;
    private _password: string;

    /**
     * Constructs a new Contact instance
     * @param id
     * @param displayName
     * @param emailAddress
     * @param userName
     * @param password
     */
    constructor(id="", displayName = "", emailAddress = "", userName = "", password = "") {
        this._id = id;
        this._displayName = displayName;
        this._emailAddress= emailAddress;
        this._userName = userName;
        this._password= password;
    }

    /**
     * Gets the id of the user
     * @returns {string}
     */
    get id():string {
        return this._id;
    }

    /**
     * Sets the id of the user
     * @param id
     */
    set id(id:string) {
        this._id = id;
    }

    /**
     * Gets the name of the display Name of the user
     * @returns {string}
     */
    get displayName():string {
        return this._displayName;
    }

    /**
     * Sets the name of the display Name of the user
     * @param name
     */
    set displayName(name) {
        if (name.trim() === "") {
            throw new Error("Event Name must not be be empty");
        }
        this._displayName = name;
    }

    /**
     * Gets the email of the user
     * @returns {string}
     */
    get emailAddress():string {
        return this._emailAddress;
    }

    /**
     * Sets the email of the user
     * @param email
     */
    set emailAddress(email) {
        if (email.trim() === "") {
            throw new Error("Description must not be empty");
        }
        this._emailAddress = email;
    }

    /**
     * Gets the username of the user
     * @returns {date}
     */
    get userName():string {
        return this._userName;
    }

    /**
     * Sets the username of the user
     * @param uName
     */
    set userName(uName) {
        if (uName.trim() === "") {
            throw new Error("Date must not be empty");
        }
        this._userName = uName;
    }

    /**
     * Gets the password of the user
     * @returns {time}
     */
    get password():string {
        return this._password;
    }

    /**
     * Sets the password of the user
     * @param word
     */
    set password(word) {
        this._password = word;
    }
}


