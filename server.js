import express  from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// app.get("/", (req,res) => {
//     // root route http://localhost:5000/
//     res.send("Root route is working!");
// });


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});