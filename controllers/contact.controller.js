import Contact from "../models/contact.model.js"; 

export const sendToContact = async (req, res) => {
    try {
        const { fullName, mobileNumber, email, message } = req.body;

        const newContact = new Contact({
            fullName,
            mobileNumber,
            email,
            message,
        });

        await newContact.save();

        res.status(201).json({ message: "Contact form submitted successfully", contact: newContact });
    } catch (error) {
        console.log("Error in sendToContact controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getFromContact = async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.status(200).json(contacts);
    } catch (error) {
        console.log("Error in getFromContact controller", error.message);
        res.status(500).json({ error: error.message });
    }
};


