
# MERN Stack Mobile Ordering Project

## Introduction

Welcome to the MERN Stack Mobile Ordering Project! This application allows users to register, sign in, browse products, apply advanced filters, add products to the cart or wishlist, and complete purchases with a seamless checkout experience. The project leverages the MERN stack (MongoDB, Express.js, React, Node.js) and incorporates various features to enhance user experience and performance.

## Features

- **User Authentication**: Users can sign in, register, or sign in as a guest using JWT authentication.
- **Authorization**: Different roles for customers and sellers.
- **Advanced Filtering**: Filter products by brand, price, rating, and RAM. Multiple filters can be applied simultaneously.
- **Server-Side Filtering**: Efficient handling of large datasets.
- **Cart and Wishlist**: Add products to cart and wishlist, with data saved in MongoDB.
- **Checkout**: Integrated with Stripe for smooth payment processing.
- **Sorting**: Sort products by price and rating, in both ascending and descending order.

## Technologies Used

- **Frontend**: React, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Gateway**: Stripe

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/mern-mobile-ordering.git
    ```

2. Navigate to the project directory:
    ```bash
    cd mern-mobile-ordering
    ```

3. Install the dependencies for both the client and server:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

4. Create a `.env` file in the server directory and add the following environment variables:
    ```env
    DB_URL = your_mongodb_connection_string
    JWT_SECRET_KEY = your_jwt_secret
    STRIPE_SECRET_KEY = your_stripe_secret_key
    ```

5. Start the development server:
    ```bash
    # In the server directory
    npm start

    # In the client directory
    npm start
    ```

## Usage

Once the server is running, you can access the application at `http://localhost:3000`. From here, users can sign in, register, browse products, apply filters, add items to the cart or wishlist, and complete purchases.

## Authentication and Authorization

The application uses JWT for authentication. Users can register, log in, or sign in as guests. Authorization roles are defined as follows:
- **Customer**: Can browse products, apply filters, add to cart/wishlist, and make purchases.
- **Seller**: (Future implementation) Can manage product listings.

## Filtering and Sorting

### Advanced Filtering

Users can filter products based on:
- **Brand**
- **Price**
- **Rating**
- **RAM**

Multiple filters can be applied simultaneously, and filtering is done server-side to handle large datasets efficiently. Server-side filtering ensures that the client application remains performant and can handle big data by reducing the amount of data sent to the client.

### Sorting

Products can be sorted by:
- **Price**: Ascending and Descending
- **Rating**: Ascending and Descending

## Cart and Wishlist

Users can add products to their cart and wishlist. This data is stored in MongoDB, ensuring that user selections are preserved across sessions.

### Cart

- Add to cart
- View cart items
- Remove items from the cart
- Proceed to checkout

### Wishlist

- Add to wishlist
- View wishlist items
- Remove items from the wishlist

## Checkout Process

The checkout process is integrated with Stripe, providing a secure and smooth payment experience. Users can review their cart, enter payment details, and complete their purchase.

## API Endpoints

### Authentication

- **POST** `/mobiles/register`: Register a new user
- **POST** `/mobiles/login`: Log in a user 

### Products

- **GET** `/mobiles/all`: Get all mobiles
- **GET** `/mobiles/:id`: Get a single mobile by ID
- **POST** `/mobiles/add`: Adds a new mobile device to the marketplace (future feature for sellers)
- **PUT** `/mobiles/update/:id`: Update a product by ID.
- **DELETE** `/mobiles/delete/:id`: Delete a product by ID.

### Filtering and Sorting

- **GET** `/mobiles/products?brand=&price=&rating=&ram=&sort=`: Get filtered and sorted products

### Cart

- **GET** `/mobiles/cart`: Get user cart
- **POST** `/mobiles/cart/:key`: Add/Remove particular mobile from the user cart based on its current state.

### Wishlist

- **GET** `/mobiles/wishlist`: Get user wishlist
- **POST** `/mobiles/wishlist/:key`:Add/Remove particular mobile from the user wishlist based on its current state.

### Checkout

- **POST** `/mobiles/checkout`: Process a checkout using Stripe

## State Management

State management in the application is handled using Context API, which provides a way to pass data through the component tree without having to pass props down manually at every level. This approach simplifies state management and ensures that state changes are efficiently propagated across the application.

## Contributing

We welcome contributions to the project! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes.
    ```bash
    git commit -m 'Add feature name'
    ```
4. Push to the branch.
    ```bash
    git push origin feature-name
    ```
5. Create a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.




 

