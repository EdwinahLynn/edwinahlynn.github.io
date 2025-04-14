"use strict";

import express, { Request, Response } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import Database from "./database.js";
import bcrypt from 'bcrypt';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import eventsRoutes from "./eventsRoutes.js"
import fs from "fs/promises";
import postsRoutes from "./postsRoutes.js";

interface User {
    ID: string;
    DisplayName: string;
    EmailAddress: string;
    Username: string;
    Password: string;
}


// Initialize Express app
const app  = express();
const port = process.env.PORT || 10;

async function  startServer() {
    try{
        app.listen(port, () => {
            console.log(`[INFO] Server running on http://localhost:${port}`);
        });
    }
    catch(error){
        console.error("[ERROR] Failed to Start Server");
        //process.exit(1);
    }
}



// Middleware to parse incoming json payloads
app.use(express.json());

// Server static files (HTML, CSS, JS, etc..) from the project root
app.use(express.static(path.join(__dirname, '../..')));

// Server static assets from node_modules for client-side user and rendering
app.use('/node_modules/@fortawesome/fontawesome-free',
    express.static(path.join(__dirname, '../../node_modules/@fortawesome/fontawesome-free')));

app.use('/node_modules/bootstrap',
    express.static(path.join(__dirname, '../../node_modules/bootstrap')));

//mount the contact routes within Node
// delegate all  the different kinds of requests to the respective routes
app.use('/api/events', eventsRoutes);
app.use('/api/posts', postsRoutes);



// Routing
// Route to server the home page (index.html)
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../", "index.html"));
});

// API endpoint to return the list of users as JSON
app.get(`/users/:id/:password`, async(req: Request, res: Response) => {
    try{
        const database = await Database.getInstance().connect();
        const user = await database.collection("users").findOne({id: req.params.id});
        if(user){
            const password =await bcrypt.compare(req.params.password, user.password);
            console.log(password);
            res.json(password);
        }
        else{
            res.status(404).json({message:"That user was notFound"});
        }
    }
    catch(err){
        console.error("[ERROR] Failed to fetch that user", err);
        res.status(500).json({message:"Server Connection error"});
    }
});

// API endpoint to return the list of users as JSON
app.get('/users', async(req: Request, res: Response) => {
    try{
        const database = await Database.getInstance().connect();
        const users = await database.collection("users").find().toArray();
        console.log(users);
        res.json(users);
    }
    catch(err){
        console.error("[ERROR] Failed to Fetch the user:", err);
        res.status(500).json({message:"Server Connection error"});
    }
});

// API endpoint to post a new user to the database
app.post('/users', async (req: Request, res: Response) => {

    try{
        const {displayName, emailAddress, userName, password } = req.body;
        console.log(emailAddress);
        console.log(password);
        console.log(userName);

        const database = await Database.getInstance().connect();
        const users = await database.collection("users").find().toArray();
        const newUserId = users.length > 0 ?
            (Math.max(...users.map(c => parseInt(c.id))) + 1).toString() : '1';

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: newUserId,
            displayName: displayName,
            emailAddress:emailAddress,
            userName:userName,
            password: hashedPassword,
        };
        await database.collection("users").insertOne(newUser);
        res.status(201).json(newUser);
    }
    catch(err) {
        console.error("[ERROR] Failed to add Contact:", err);
        res.status(500).json({message: "Server Connection error"});
    }

});

// API endpoint to update a user's information
app.put('/users/:id', async (req: Request, res: Response):Promise<any> => {
    try{
        const database = await Database.getInstance().connect();
        const {displayName, emailAddress, userName, password} = req.body;
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: req.params.id,
            displayName: displayName,
            emailAddress:emailAddress,
            userName:userName,
            password: hashedPassword,
        };
        const result =
            await database.collection("users")
                .findOneAndUpdate(
                    {id: req.params.id},
                    {$set: newUser},
                    {returnDocument: 'after'}
                );
        if(result && result.value){
            res.json(result.value);
        }
        else{
            const updateUser = await database.collection("users").findOne({id: req.params.id});
            if(updateUser){
                res.json(updateUser);
            }
            else{
                res.status(404).json({message:"Could not find contact"});
            }
        }

    }
    catch(err) {
        console.error("[ERROR] Failed to add Contact:", err);
        res.status(500).json({message: "Server Connection error"});
    }
});

// API endpoint to delete a user from the database
app.delete('/users/:id', async (req: Request, res: Response):Promise<any> => {
    try{
        // Connect to the database or create one if it doesnt exist
        const db = await Database.getInstance().connect();

        // Delete user based on the passed int parameter
        const user = await db.collection("users").deleteOne({id: req.params.id});
        if(user.deletedCount > 0){
            res.json({message: "Account has been has been Deleted"});
        }
        else{
            res.status(404).json({message:"That user doesnt not exist"});
        }
    }
    catch(err){
        console.error("[ERROR] Failed to fetch the Event:", err);
        res.status(500).json({message:"Server Connection error"});
    }
});

await startServer();


