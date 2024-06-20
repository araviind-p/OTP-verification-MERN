
# Secure Authentication and Authorization System
![How to Build a Secure and Scalable Authentication System with Express js and MongoDB With React js App]


Welcome to the Secure Authentication and Authorization System! This project is a scalable and secure implementation of authentication and authorization using Node.js, Express.js, bcrypt, and MongoDB. It provides a robust foundation for managing user accounts, authentication, and access control in your web applications. Frontend is created using React js(npx-cra)


## Features

- User registration with secure password hashing using bcrypt
- User login with session-based authentication
- Account activation via email confirmation
- OTP verifictaion
- login with OTP


# Installation

Follow these steps to set up the Secure Authentication and Authorization System in your system:

- Clone the repository: ```git clone https://github.com/araviind-p/OTP-verification-MERN.git```

## Backend set-up
In terminal:
```cd server```
```npm i```
- create .env file like example-env.env
- ensure mongodb is connected
```nodemon server.js```

## Frontend set-up
In terminal
```cd client```
```npm i```
- search and replace backend api in all components 'https://otp-verification-mern.onrender.com'
with ```http://127.0.0.1:4000```
```npm start```