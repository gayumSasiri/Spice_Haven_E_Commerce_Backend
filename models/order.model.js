import mongoose from "mongoose";

let orderCounter = 1;
const generateOrderId = () => {
  const prefix = "CLS";
  const orderId = prefix + String(orderCounter).padStart(3, '0');
  orderCounter++;
  return orderId;
};

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default: generateOrderId,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, 'First name can only contain letters'],
  },
  lastName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, 'Last name can only contain letters'],
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  address: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, 'State can only contain letters'],
  },
  zip: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['CreditCard', 'COD', 'Instore'],
    required: true,
  },
  cardDetails: {
    nameOnCard: {
      type: String,
      match: [/^[A-Za-z\s.]+$/, 'Name on card can only contain letters, spaces, and dots'],
      required: function() { return this.paymentMethod === 'CreditCard'; }
    },
    cardNumber: {
      type: String,
      match: [/^\d{16}$/, 'Credit card number must be 16 digits'],
      required: function() { return this.paymentMethod === 'CreditCard'; }
    },
    expiration: {
      type: String,
      match: [/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration must be in mm/yy format'],
      required: function() { return this.paymentMethod === 'CreditCard'; }
    },
    cvv: {
      type: String,
      match: [/^\d{3}$/, 'CVV must be 3 digits'],
      required: function() { return this.paymentMethod === 'CreditCard'; }
    }
  },
  cart: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    }
  }],
  deliveryStatus: {
    type: String,
    enum: ['processing', 'shipped'],
    default: 'processing',
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

orderSchema.pre('save', async function (next) {
  if (!this.orderId) {
    const lastOrder = await mongoose.model('Order').findOne({}, {}, { sort: { 'createdAt': -1 } });
    const lastOrderId = lastOrder ? lastOrder.orderId : 'CLS000';
    const nextOrderId = 'CLS' + (parseInt(lastOrderId.slice(3)) + 1).toString().padStart(3, '0');
    this.orderId = nextOrderId;
  }
  next();
});

const Order = mongoose.model("order", orderSchema);

export default Order;