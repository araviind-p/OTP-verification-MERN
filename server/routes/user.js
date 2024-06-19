const express = require('express')
const router = express.Router()

//Handlers from controllers
const { login, signup, sendotp, loginwithotp, profile, updateUser, loginwithotpverify, logout, deleteuser } = require("../controllers/auth")
const { auth } = require('../middlewares/authMiddle')

router.post('/login', login)
router.post('/signup', signup)
router.post('/sendotp', sendotp)
router.post('/loginwithotp', loginwithotp)
router.post('/loginwithotpverify', loginwithotpverify)
router.post('/logout', logout)

// fetch profile
router.get("/profile", profile)

// update profile
router.put("/updateUser", auth, updateUser)

// delete account
router.delete("/deleteuser/:id", deleteuser)

//testing protected route
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "You are a valid Tester 👨‍💻"
    })
})



module.exports = router