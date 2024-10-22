import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const createOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      address2,
      country,
      state,
      zip,
      totalAmount,
      paymentMethod,
      customerId,
      cart,
      cardDetails,
    } = req.body;

    const newOrder = new Order({
      firstName,
      lastName,
      email,
      address,
      address2: address2 || "", 
      country,
      state,
      zip,
      totalAmount,
      paymentMethod,
      customerId,
      cart,
      deliveryStatus: 'processing', 
    });

    if (paymentMethod === 'CreditCard') {
      newOrder.cardDetails = {
        nameOnCard: cardDetails.nameOnCard,
        cardNumber: cardDetails.cardNumber,
        expiration: cardDetails.expiration,
        cvv: cardDetails.cvv,
      };
    }

    // Loop through the cart to update product quantity
    for (const item of cart) {
        const product = await Product.findById(item.productId).session(session);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
  
        // Update product's quantityInGrams
        if (product.quantityInGrams < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.title}`);
        }
  
        product.quantityInGrams -= item.quantity; // Decrease quantity
        await product.save({ session }); // Save product within the session
    }

    // Save the new order
    await newOrder.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log("Error in createOrder controller", error.message);
    res.status(500).json({ error: error.message });
  }
};
