const bcrypt = require('bcrypt')
const user = require("../models/user")
const jwt = require('jsonwebtoken')
const OTP = require('../models/OTP')
const otpGenerator = require("otp-generator");
const mailSender = require('../utils/mailSender');
require('dotenv').config()


// login with email and password
exports.login = async (req, res) => {

    try {
        const { email, password } = req.body
        //validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Plz fill all the details carefully"
            })
        }

        //check for registered User
        let User = await user.findOne({ email })
        //if user not registered or not found in database
        if (!User) {
            return res.status(401).json({
                success: false,
                message: "You have to Signup First"
            })
        }
        const payload = {
            email: User.email,
            id: User._id,
        }

        //verify password and generate a JWt token 🔎
        if (await bcrypt.compare(password, User.password)) {
            //if password matched
            //now lets create a JWT token
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            )
            User = User.toObject()
            User.token = token

            User.password = undefined

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true  //It will make cookie not accessible on clinet side
            }
            res.cookie(
                "token",
                token,
                options
            ).status(200).json({
                success: true,
                token,
                User,
                message: "Logged in Successfully✅"
            })
        } else {
            //password donot matched
            return res.status(403).json({
                success: false,
                message: "Password incorrects"
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Login failure⚠️ :" + error
        })
    }
}


// Send OTP while registration
exports.sendotp = async (req, res) => {

    try {
        const { email } = req.body;

        // Check if user is already present
        // Find user with provided email
        const checkUserPresent = await user.findOne({ email });
        // to be used in case of signup

        // If user found with provided email
        if (checkUserPresent) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User is Already Registered`,
            });
        }

        // Generating 6-digit numeric OTP
        let otp;
        let otpExists;
        do {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            otpExists = await OTP.findOne({ otp });
        } while (otpExists);

        // Save OTP to database
        const otpPayload = { email, otp };
        await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};


//signup handle
exports.signup = async (req, res) => {
    try {
        //get input data
        const { name, email, age, place, password, otp } = req.body

        // Check if All Details are there or not
        if (!name ||
            !email ||
            !password ||
            !otp ||
            !age ||
            !place
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }

        //check if user already exists?
        const userExists = await user.findOne({ email })
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }

        //secure password
        let hashedPassword
        try {
            hashedPassword = await bcrypt.hash(password, 10) // Encrypt password using bcrypt
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Hashing pasword error for ${password}: ` + error.message
            })
        }

        // Create new user and store into database
        const User = await user.create({
            name, email, age, place, password: hashedPassword
        })

        // Send a confirmation email
        const emailTitle = "Welcome to user management system!";
        const emailBody = `<h1>Hello, ${name}</h1><p>Thank you for signing up!</p>`;
        await mailSender(email, emailTitle, emailBody);

        return res.status(200).json({
            success: true,
            User,
            message: "user created successfully ✅"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "User registration failed"
        })
    }
}


//login with otp
exports.loginwithotp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user is already present
        const checkUserPresent = await user.findOne({ email });

        // If user found with provided email
        if (!checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: `Not a registered user`,
            });
        }

        // Generating 6-digit numeric OTP
        let otp;
        let otpExists;
        do {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            otpExists = await OTP.findOne({ otp: otp });
        } while (otpExists);

        const otpPayload = { email, otp };
        await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};


//login with otp verify
exports.loginwithotpverify = async (req, res) => {
    try {
        //get input data
        const { otp, email } = req.body

        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }

        let User = await user.findOne({ email })
        const payload = {
            email: User.email,
            id: User._id,
        }

        //now lets create a JWT token
        let token = jwt.sign(payload,
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        )

        User = User.toObject()
        User.token = token

        User.password = undefined
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true  // It will make cookie not accessible on clinet side
        }

        return res.cookie("token",
            token,
            options)
            .status(200).json({
                success: true,
                User,
                message: "OTP verified ✅"
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "otp verification failed"
        })
    }
}


// profile fetch
exports.profile = async (req, res) => {
    try {
        const { email } = req.query;
        // Fetch user data from the database using the email
        const userProfile = await user.findOne({ email }); // Assuming 'user' is your user model
        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user: userProfile
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// update user details
exports.updateUser = async (req, res) => {
    try {
        const { email, name, age, place } = req.body;
        const updatedData = {};

        if (name) updatedData.name = name;
        if (age) updatedData.age = age;
        if (place) updatedData.place = place;

        const userProfile = await user.findOneAndUpdate({ email }, updatedData, { new: true }); // Updating user data

        if (!userProfile) {  // User not found
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user: userProfile,
            message: "User updated successfully"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


//logout user
exports.logout = (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token");

        // Send a success response
        return res.status(200).json({
            success: true,
            message: "Logged out successfully ✅"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Logout failed ⚠️"
        });
    }
};


//delete user account
exports.deleteuser = async (req, res) => {
    try {
        const deletedUser = await user.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found ⚠️"
            });
        }
        
        // Send a success response
        return res.status(200).json({
            success: true,
            message: "User account deleted ✅"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Can't delete account ⚠️"
        });
    }
};
