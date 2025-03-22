// cannister code goes here
import { v4 as uuidv4 } from "uuid";
import { StableBTreeMap, ic } from "azle";
import express from "express";

/**
    This type represents a message that can be listed on a board.
*/
class Message {
    id: string;
    title: string;
    body: string;
    attachmentURL: string;
    createdAt: Date;
    updatedAt: Date | null
 }

 const messagesStorage = new StableBTreeMap<string, Message>(0);

 const app = express();
 app.use(express.json());

 app.post("/messages", (req, res) => {
    const message: Message =  {id: uuidv4(), createdAt: getCurrentDate(), ...req.body};
    messagesStorage.insert(message.id, message);
    res.json(message);
 });

 app.get("/messages", (req, res) => {
    res.json(messagesStorage.values());
 });

 
app.get("/messages/:id", (req, res) => {
    const messageId = req.params.id;
    const messageOpt = messagesStorage.get(messageId);
    if (!messageOpt) {
       res.status(404).send(`the message with id=${messageId} not found`);
    } else {
       res.json(messageOpt.Some);
    }
 });