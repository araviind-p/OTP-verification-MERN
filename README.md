
# Secure Authentication and Authorization System
How to Build a Secure and Scalable Authentication System with Express js and MongoDB together With React js App?


Welcome to the Secure Authentication and Authorization System! This project is a scalable and secure implementation of authentication and authorization using Node.js, Express.js, bcrypt, MongoDB, and React js. It provides a robust foundation for managing user accounts, authentication, and access control in your web applications. Frontend is created using React js(npx-cra)



### Check live demo 👉 https://otp-verification-mern-1.onrender.com



## Features

- User registration with secure password hashing using bcrypt
- User login with session-based authentication and authorization using JWT
- OTP verifictaion
- Confirmation mail on successful registration
- login with OTP
- Update profile
- Logout
- Delete user account


## Installation

Follow these steps to set up the Secure Authentication and Authorization System in your system:

- Clone the repository
```
git clone https://github.com/araviind-p/OTP-verification-MERN.git
```

## Backend set-up
In terminal:
```
cd server
```
```
npm i
```
- create .env file like example-env.env
- refer this video for Gmail SMTP setup https://youtu.be/I9x0w8cjR_o?si=JvEM6g5Fcthy8Ybq
- make sure mongodb is connected
```
nodemon server.js
```

## Frontend set-up
In terminal
```
cd client
```
```
npm i
```
- search and replace backend api in all components https://otp-verification-mern.onrender.com
with your local server
```
http://127.0.0.1:4000
```
```
npm start
```
