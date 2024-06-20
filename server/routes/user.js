const express = require('express')
const router = express.Router()

//Handlers from controllers
const { login, signup, sendotp, loginwithotp, profile, updateUser, loginwithotpverify, logout, deleteuser } = require("../controllers/auth")

// auth middleware
const { auth } = require('../middlewares/authMiddle')

// send otp while signup
router.post('/sendotp', sendotp)

// signup user
router.post('/signup', signup)

// login
router.post('/login', login)

// login with otp
router.post('/loginwithotp', loginwithotp)

// login with otp verify
router.post('/loginwithotpverify', loginwithotpverify)

// logout user
router.post('/logout', logout)

// fetch user profile
router.get("/profile", profile)

// update user profile
router.put("/updateUser", auth, updateUser)

// delete user account
router.delete("/deleteuser/:id", deleteuser)

module.exports = router