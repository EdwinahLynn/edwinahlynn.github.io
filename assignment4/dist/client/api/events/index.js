"use strict";
import { NewEvent } from "../../eventplanning.js";
import { Post } from "../../posts.js";
export async function fetchEvents() {
    const response = await fetch('/api/events');
    if (!response.ok)
        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    return response.json();
}
export async function fetchEvent(id) {
    const response = await fetch(`/api/events/${id}`);
    if (!response.ok)
        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    return response.json();
}
export async function createEvents(event) {
    const response = await fetch(`/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    });
    if (!response.ok)
        throw new Error(`Failed to create an event: ${response.statusText}`);
    const eventData = await response.json();
    return new NewEvent(eventData.id, eventData.eventName, eventData.eventDescription, eventData.eventDate, eventData.eventTime, eventData.eventLocation);
}
export async function updateEvent(id, event) {
    const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    });
    if (!response.ok)
        throw new Error(`Failed to create contact: ${response.statusText}`);
    const eventData = await response.json();
    return new NewEvent(eventData.id, eventData.eventName, eventData.eventDescription, eventData.eventDate, eventData.eventTime, eventData.eventLocation);
}
export async function deleteEvent(id) {
    const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok)
        throw new Error(`Failed to delete the event: ${response.statusText}`);
}
export async function fetchUser(id, password) {
    const response = await fetch(`/users/${id}/${password}`);
    if (!response.ok)
        throw new Error(`Failed to create an event: ${response.statusText}`);
    const userData = await response.json();
    return userData;
}
export async function fetchUsers() {
    const response = await fetch(`/users`);
    if (!response.ok)
        throw new Error(`Failed to create an event: ${response.statusText}`);
    const userData = await response.json();
    console.log(userData);
    return userData;
}
export async function createUsers(users) {
    const response = await fetch(`/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users)
    });
    if (!response.ok)
        throw new Error(`Failed to create an event: ${response.statusText}`);
    const userData = await response.json();
    console.log(userData);
}
export async function updateUserInfo(id, users) {
    console.log(users);
    const response = await fetch(`/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users),
    });
    if (!response.ok)
        throw new Error(`Failed to create an event: ${response.statusText}`);
    const userData = await response.json();
    console.log(userData);
}
export async function deleteUserInfo(id) {
    console.log(id);
    const response = await fetch(`/users/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok)
        throw new Error(`Failed to delete the user: ${response.statusText}`);
    const userData = await response.json();
    console.log(userData);
}
export async function fetchPosts() {
    const response = await fetch('/api/posts');
    if (!response.ok)
        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    const data = response.json();
    return data;
}
export async function fetchPost(id) {
    const response = await fetch(`/api/posts/${id}`);
    if (!response.ok)
        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    return response.json();
}
export async function createPosts(postData) {
    console.log("In post");
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });
    if (!response.ok)
        throw new Error(`Failed to create an event: ${response.statusText}`);
    const post = await response.json();
    return new Post(post.id, post.postTitle, post.postDescription);
}
export async function deletePost(id) {
    console.log(id);
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok)
        throw new Error(`Failed to delete the user: ${response.statusText}`);
    const userData = await response.json();
    console.log(userData);
}
export async function updatePosts(id, post) {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
    });
    if (!response.ok)
        throw new Error(`Failed to create an event: ${response.statusText}`);
    const userData = await response.json();
}
//# sourceMappingURL=index.js.map