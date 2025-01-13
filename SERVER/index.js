require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDb = require('./config/database.js');
const userRoutes = require('./routes/User.js');

connectToDb();
const app = express(); 
app.use(express.json());
app.use(
    cors({
        origin : "*",
        credentials : true,
    })
);
app.use(cookieParser());

const PORT = process.env.PORT || 4000;
app.use("/api/v1/auth" , userRoutes);
app.listen(PORT , () => {
    console.log(`The the App is running at ${PORT}`);
});