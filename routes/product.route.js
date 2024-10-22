import express from "express";
import multer from 'multer';
import { addNewProduct, getAllProducts, getProductByProductId } from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", upload.single("image"), addNewProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProductByProductId);

export default router;
