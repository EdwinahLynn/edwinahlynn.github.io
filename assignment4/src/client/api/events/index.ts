"use strict"

import {NewEvent} from "../../eventplanning.js";
import {Post} from "../../posts.js";
import{NewUser} from "../../user.js";

interface EventData {
    eventName: string;
    eventDescription: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;

}

export interface postType {
    postTitle: string;
    postDescription: string;

}

export interface UserType {
    displayName: string;
    emailAddress: string;
    userName: string;
    password: string;

}


export async function fetchEvents(): Promise<NewEvent[]> {
    const response = await fetch('/api/events')
    if(!response.ok) throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    return response.json();
}

export async function fetchEvent(id:string): Promise<NewEvent> {
    const response = await fetch(`/api/events/${id}`);
    if(!response.ok) throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    return response.json();
}


export async function createEvents(event: EventData): Promise<EventData> {
    const response = await fetch(`/api/events`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    });
    if(!response.ok) throw new Error(`Failed to create an event: ${response.statusText}`);
    const eventData = await response.json();
    return new NewEvent(eventData.id, eventData.eventName, eventData.eventDescription, eventData.eventDate,
        eventData.eventTime, eventData.eventLocation);
}

export async function updateEvent(id : string, event: EventData): Promise<EventData> {
    const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    });
    if(!response.ok) throw new Error(`Failed to create contact: ${response.statusText}`);
    const eventData = await response.json();
    return new NewEvent(eventData.id, eventData.eventName, eventData.eventDescription, eventData.eventDate,
        eventData.eventTime, eventData.eventLocation);
}

export async function deleteEvent(id: string): Promise<void> {
    const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
    });
    if(!response.ok) throw new Error(`Failed to delete the event: ${response.statusText}`);
}

export async function fetchUser(id:any, password:string): Promise<Boolean> {
    const response = await fetch(`/users/${id}/${password}`)
    if(!response.ok) throw new Error(`Failed to create an event: ${response.statusText}`);
    const userData = await response.json();
    return userData;

}

export async function fetchUsers(): Promise<NewUser[]> {
    const response = await fetch(`/users`)
    if(!response.ok) throw new Error(`Failed to create an event: ${response.statusText}`);
    const userData = await response.json();
    console.log(userData);
    return userData;

}

export async function createUsers(users: UserType): Promise<void> {
    const response = await fetch(`/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(users)
    });
    if(!response.ok) throw new Error(`Failed to create an event: ${response.statusText}`);
    const userData = await response.json();
    console.log(userData);
}



export async function updateUserInfo(id:string, users: UserType): Promise<void> {
    console.log(users);
    const response = await fetch(`/users/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(users),
    });
    if(!response.ok) throw new Error(`Failed to create an event: ${response.statusText}`);
    const userData = await response.json();
    console.log(userData);
}

export async function deleteUserInfo(id:any): Promise<void> {
    console.log(id);
    const response = await fetch(`/users/${id}`, {
        method: 'DELETE'
    });
    if(!response.ok) throw new Error(`Failed to delete the user: ${response.statusText}`);
    const userData = await response.json();
    console.log(userData);
}


export async function fetchPosts(): Promise<Post[]> {
    const response = await fetch('/api/posts');
    if(!response.ok) throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    const data = response.json();
    return data;

}

export async function fetchPost(id:string): Promise<Post> {
    const response = await fetch(`/api/posts/${id}`);
    if(!response.ok) throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    return response.json();
}

export async function createPosts(postData:postType): Promise<postType> {
    console.log("In post");
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postData)
    });
    if(!response.ok) throw new Error(`Failed to create an event: ${response.statusText}`);
    const post = await response.json();
    return new Post (post.id, post.postTitle, post.postDescription);
}

export async function deletePost(id:any): Promise<void> {
    console.log(id);
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if(!response.ok) throw new Error(`Failed to delete the user: ${response.statusText}`);
    const userData = await response.json();
    console.log(userData);
}

export async function updatePosts(id:string, post: postType): Promise<void> {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(post),
    });
    if(!response.ok) throw new Error(`Failed to create an event: ${response.statusText}`);
    const userData = await response.json();
}




