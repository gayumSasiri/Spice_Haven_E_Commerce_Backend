import express from "express";
import { getFromContact, sendToContact } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", sendToContact);

router.get("/", getFromContact);

export default router;