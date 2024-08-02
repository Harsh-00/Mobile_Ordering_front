<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->



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
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
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

- **POST** `/api/auth/register`: Register a new user
- **POST** `/api/auth/login`: Log in a user
- **POST** `/api/auth/guest-login`: Log in as a guest

### Products

- **GET** `/api/products`: Get all products
- **GET** `/api/products/:id`: Get a single product by ID
- **POST** `/api/products`: Add a new product (future feature for sellers)
- **PUT** `/api/products/:id`: Update a product by ID (future feature for sellers)
- **DELETE** `/api/products/:id`: Delete a product by ID (future feature for sellers)

### Filtering and Sorting

- **GET** `/api/products?brand=&price=&rating=&ram=&sort=`: Get filtered and sorted products

### Cart

- **GET** `/api/cart`: Get user's cart
- **POST** `/api/cart`: Add an item to the cart
- **PUT** `/api/cart/:id`: Update cart item quantity
- **DELETE** `/api/cart/:id`: Remove an item from the cart

### Wishlist

- **GET** `/api/wishlist`: Get user's wishlist
- **POST** `/api/wishlist`: Add an item to the wishlist
- **DELETE** `/api/wishlist/:id`: Remove an item from the wishlist

### Checkout

- **POST** `/api/checkout`: Process a checkout using Stripe

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
