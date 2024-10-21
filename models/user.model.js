import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        match: [/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'],  
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],  
    },
    role: {
        type: String,
        required: true,
        enum: ["seller", "buyer", "admin"],  
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
