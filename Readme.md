# Spice Haven

## Project Overview

Spice Haven is an e-commerce platform specializing in selling spices. The application features user authentication, real-time product management, secure payment integration, and more. The backend is built using Node.js and Express, with MongoDB as the database. Firebase is used for file storage, and the app uses JWT for user authentication and authorization.

## Technologies Used

- **Node.js**: JavaScript runtime environment for building the server-side application.
- **Express**: Web framework for creating the backend of the application.
- **MongoDB**: NoSQL database for storing product and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB to define schemas and interact with the database.
- **Socket.IO**: Real-time event-driven communication, if chat or live updates are implemented.
- **JWT (jsonwebtoken)**: For secure authentication and authorization of users.
- **Firebase**: Used for storing images and other static files.
- **Multer**: Middleware for handling file uploads (like product images).
- **bcryptjs**: For hashing passwords securely.
- **dotenv**: Environment variable management for secret keys and configurations.
- **cors**: Middleware for allowing cross-origin resource sharing.
- **cookie-parser**: Middleware for parsing cookies attached to the client requests.
- **nodemon**: Utility that automatically restarts the server during development when files change.

## Features and Functionalities

1. **User Authentication**:
   - Secure user sign-up and login using JSON Web Tokens (JWT).
   - Passwords are hashed and securely stored in MongoDB using bcryptjs.

2. **Product Management**:
   - Real-time product updates for admins, such as adding, updating, and deleting products.
   - Products have attributes like title, category, description, price, quantity (in grams), and an image URL.

3. **File Uploads**:
   - Firebase is integrated for storing product images, and the image URLs are stored in MongoDB.

4. **Shopping Cart**:
   - Users can add products to the cart and proceed to checkout.
   - Cart and order details are stored and managed in MongoDB.

5. **Payment System**:
   - Integration with multiple payment methods like credit cards, cash on delivery, and in-store payments.
   - Card details are securely processed and stored only when using the credit card option.

6. **Order Management**:
   - Orders contain cart details, shipping address, payment method, and order status.
   - Upon order creation, the product quantities are updated in the database.

## How to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/gayumSasiri/Spice_Haven_E_Commerce_Backend.git

2. **Goto project Directory**:
   ```bash
   cd spice_haven

3. **Install Dependencies**:
   ```bash
   npm install

4. **Run the Server**:
   ```bash
   npm run server

### If anything happens 

create a .env file in the root directory of your project and paste the following content into the file.

    PORT=5000

    MONGO_DB_URI=mongodb+srv://gayumsasiri:961021@spicehaven.iqdlr.mongodb.net/?retryWrites=true&w=majority&appName=SpiceHaven

    JWT_SECRET=UGtIBMme3vXLhQp+BvBnXNPGiWfQnLcRWGgZ6t0rITc=

    NODE_ENV=development

- Restart the Project: If you make changes to the .env file or encounter any issues, restart the project



