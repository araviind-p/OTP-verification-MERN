const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 4000

// Apply CORS middleware
app.use(cors({ credentials: true, origin: true }));

//Apply cookie parser
app.use(cookieParser());

app.use(express.json())

//calling Database function
require('./config/database').connect()

//route importing and mounting
const user = require('./routes/user')

app.use('/api/v1', user)

app.listen(PORT, () => {
    console.log("Server Started")
})