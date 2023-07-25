const mongoose = require("mongoose");
require("dotenv").config();


// Veriables
const DB_URL = process.env.DB_URL;



const connectDb = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to the Database!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;