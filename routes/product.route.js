import express from "express";
import multer from 'multer';
import { addNewProduct } from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), addNewProduct);

export default router;