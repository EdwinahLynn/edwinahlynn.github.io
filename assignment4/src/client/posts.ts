"use strict";

/**
 * Represents an event field with name, description, date, time and location
 */

export class Post {
    private _id: string;
    private _postTitle: string;
    private _postDescription: string;

    /**
     * Constructs a new Contact instance
     * @param id
     * @param postTitle
     * @param postDescription
     */
    constructor(id="", postTitle = "", postDescription = "") {
        this._id = id;
        this._postTitle = postTitle;
        this._postDescription = postDescription;
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
     * Gets the title of the post
     * @returns {string}
     */
    get postTitle():string {
        return this._postTitle;
    }

    /**
     * Sets the name of the event. Validates input to make sure it's not empty
     * @param title
     */
    set postTitle(title) {
        if (title.trim() === "") {
            throw new Error("Event Name must not be be empty");
        }
        this._postTitle = title;
    }

    /**
     * Gets the description of the post
     * @returns {string}
     */
    get postDescription() {
        return this._postDescription;
    }

    /**
     * Sets the description of the event. Validates input to make sure it's not empty
     * @param description
     */
    set postDescription(description) {
        if (description.trim() === "") {
            throw new Error("Description must not be empty");
        }
        this._postDescription = description;
    }

}


