import Product from "../models/product.model.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../utils/firebaseConfig.js"; 
import multer from "../middleware/multer.js"; 
import mongoose from "mongoose";

// Initialize Firebase
initializeApp(firebaseConfig);

export const addNewProduct = async (req, res) => {
    const session = await mongoose.startSession(); 
    session.startTransaction();

    try {
        const { sellerId, productTitle, productCategory, description, priceInLKR, quantityInGrams } = req.body;
        const file = req.file; // Multer adds file to req.file
        // console.log(req.file);
        
        if (!file) {
        return res.status(400).json({ error: "No image file uploaded" });
        }

        // Upload image to Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, `productImages/${file.originalname}`);
        
        const snapshot = await uploadBytes(storageRef, file.buffer);
        const imageUrl = await getDownloadURL(snapshot.ref);

        // Save product with image URL
        const newProduct = new Product({
        sellerId,
        productTitle,
        productCategory,
        description,
        imageUrl, // new URL
        priceInLKR,
        quantityInGrams,
        });

        await newProduct.save({ session });

        res.status(201).json(newProduct);

        await session.commitTransaction();
        session.endSession();

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.log("Error in Add New Product : ", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); 

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(products);

    } catch (error) {
        console.log("Error in Get All Products: ", error.message);
        res.status(500).json({ error: error.message });
    }
};

