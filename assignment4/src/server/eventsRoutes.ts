"use strict"

import express, { Request, Response } from "express";
import Database from "./database.js";


const router = express.Router();



/**
 * Handles GET request to retrieve all events from the database
 */
router.get('/', async(req: Request, res: Response) => {
    try{
        const database = await Database.getInstance().connect();
        const events = await database.collection("events").find().toArray();
        res.json(events);
    }
    catch(err){
        console.error("[ERROR] Failed to Fetch Contacts:", err);
        res.status(500).json({message:"Server Connection error"});
    }
});

/**
 * Handles GET request to retrieve a single event from the database
 */
router.get('/:id', async(req: Request, res: Response) => {
    try{
        const database = await Database.getInstance().connect();
        const event = await database.collection("events").findOne({id: req.params.id});
        if(event){
            res.json(event);
        }
        else{
            res.status(404).json({message:"No event Found"});
        }
    }
    catch(err){
        console.error("[ERROR] Failed to fetch that event", err);
        res.status(500).json({message:"Server Connection error"});
    }
});


/**
 * Handles POST request to write new event data to the database collection
 */
router.post('/', async(req: Request, res: Response) => {
    try{
        const database = await Database.getInstance().connect();
        const events = await database.collection("events").find().toArray();
        const newEventId = events.length > 0 ?
            (Math.max(...events.map(c => parseInt(c.id))) + 1).toString() : '1';

        const newEvent = {id:newEventId, ...req.body};
        await database.collection("events").insertOne(newEvent);
        res.status(201).json(newEvent);
    }
    catch(err) {
        console.error("[ERROR] Failed to add Contact:", err);
        res.status(500).json({message: "Server Connection error"});
    }
});

/**
 * Put handles updating a single event
 */
router.put('/:id', async(req: Request, res: Response) => {

    try{
        const database = await Database.getInstance().connect();
        const {...updatedData} = req.body;
        const result =
            await database.collection("events")
                .findOneAndUpdate(
                    {id: req.params.id},
                    {$set: updatedData },
                    {returnDocument: 'after'}
                );
        if(result && result.value){
            res.json(result.value);
        }
        else{
            const updateContact = await database.collection("events").findOne({id: req.params.id});
            if(updateContact){
                res.json(updateContact);
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

/**
 *DELETE handle removing a single event from the database
 */
router.delete('/:id', async(req: Request, res: Response) => {

    try{
        const db = await Database.getInstance().connect();
        const result = await db.collection("events").deleteOne({id: req.params.id});
        if(result.deletedCount > 0){
            res.json({message: "Event has been Deleted"});
        }
        else{
            res.status(404).json({message:"That event doesnt not exist"});
        }
    }
    catch(err){
        console.error("[ERROR] Failed to fetch the Event:", err);
        res.status(500).json({message:"Server Connection error"});
    }

});

export default router;