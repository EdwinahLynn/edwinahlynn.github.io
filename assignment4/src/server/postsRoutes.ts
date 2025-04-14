"use strict"

import express, { Request, Response } from "express";
import Database from "./database.js";


const router = express.Router();

// Create a structure for the information that will be need for the event
interface  Post {
    id: string;
    postTitle: string;
    postDescription: string;
}

/**
 * Handles GET request to retrieve all events and display them on the page
 */
router.get('/', async(req: Request, res: Response)=> {
    try{
        const database = await Database.getInstance().connect();
        const posts = await database.collection("posts").find().toArray();
        res.json(posts);
    }
    catch(err){
        console.error("[ERROR] Failed to Fetch posts", err);
        res.status(500).json({message:"Server Connection error"});
    }
});

router.get('/:id', async(req: Request, res: Response)=> {
    try{
        const database = await Database.getInstance().connect();
        const post = await database.collection("posts").findOne({id: req.params.id});
        if(post){
            res.json(post);
        }
        else{
            res.status(404).json({message:"No post Found"});
        }
    }
    catch(err){
        console.error("[ERROR] Failed to fetch that post", err);
        res.status(500).json({message:"Server Connection error"});
    }
});



/**
 * Handles POST request to write new event data to the database collection
 */
router.post('/', async(req: Request, res: Response) => {
    console.log("in post for posts");
    try{
        const database = await Database.getInstance().connect();
        const posts = await database.collection("posts").find().toArray();
        const newPostId = posts.length > 0 ?
            (Math.max(...posts.map(c => parseInt(c.id))) + 1).toString() : '1';

        const newEvent = {id:newPostId, ...req.body};
        await database.collection("posts").insertOne(newEvent);
        res.status(201).json(newEvent);
    }
    catch(err) {
        console.error("[ERROR] Failed to add a post:", err);
        res.status(500).json({message: "Server Connection error"});
    }
});

/**
 * Put handles updating a aingle post
 */
router.put('/:id', async(req: Request, res: Response) => {

    try{
        const database = await Database.getInstance().connect();
        const {...updatedData} = req.body;
        const result =
            await database.collection("posts")
                .findOneAndUpdate(
                    {id: req.params.id},
                    {$set: updatedData },
                    {returnDocument: 'after'}
                );
        if(result && result.value){
            res.json(result.value);
        }
        else{
            const updateContact = await database.collection("posts").findOne({id: req.params.id});
            if(updateContact){
                res.json(updateContact);
            }
            else{
                res.status(404).json({message:"Could not find that post"});
            }
        }

    }
    catch(err) {
        console.error("[ERROR] Failed to add a post", err);
        res.status(500).json({message: "Server Connection error"});
    }
});

/**
 *DELETE handle removing a single event from the database
 */
router.delete('/:id', async(req: Request, res: Response) => {

    try{
        const db = await Database.getInstance().connect();
        const result = await db.collection("posts").deleteOne({id: req.params.id});
        if(result.deletedCount > 0){
            res.json({message: "Post has been Deleted"});
        }
        else{
            res.status(404).json({message:"That post doesnt not exist"});
        }
    }
    catch(err){
        console.error("[ERROR] Failed to fetch the post:", err);
        res.status(500).json({message:"Server Connection error"});
    }

});
export default router;