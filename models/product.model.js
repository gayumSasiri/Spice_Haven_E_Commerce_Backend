import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productTitle: {
        type: String,
        required: true,
        match: [/^[a-zA-Z\s]+$/, 'Product title should only contain letters and spaces']
    },
    productCategory: {
        type: String,
        required: true,
        enum: ["Organic", "Vegan", "Exotic", "Gluten-Free"],
        default: "Organic"
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    priceInLKR: {
        type: Number,
        required: true
    },
    quantityInGrams: {
        type: Number,
        required: true
    },
    rating: {
        rate: { 
            type: Number, 
            default: () => (Math.random() * 10).toFixed(1) 
        },
        count: { 
            type: Number, 
            default: 100 
        }
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
