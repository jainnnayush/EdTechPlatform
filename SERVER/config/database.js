const mongoose = require("mongoose");

const connectToDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB',error.message);
    }
};

module.exports = connectToDb;
