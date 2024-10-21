import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        match: [/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'],
    },
    mobileNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Mobile number must be 10 digits long'], 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    message: {
        type: String,
        required: true,
        minlength: 1,
    },
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
