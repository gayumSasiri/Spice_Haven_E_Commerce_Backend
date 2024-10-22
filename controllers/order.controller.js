import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
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
      address2: address2 || "", // Optional field with a default value
      country,
      state,
      zip,
      totalAmount,
      paymentMethod,
      customerId,
      cart,
      deliveryStatus: 'processing', // Default value for delivery status
    });

    // Only add card details if payment method is CreditCard
    if (paymentMethod === 'CreditCard') {
      newOrder.cardDetails = {
        nameOnCard: cardDetails.nameOnCard,
        cardNumber: cardDetails.cardNumber,
        expiration: cardDetails.expiration,
        cvv: cardDetails.cvv,
      };
    }

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("Error in createOrder controller", error.message);
    res.status(500).json({ error: error.message });
  }
};
