// Imports
const express = require("express");
const ejs = require("dotenv").config();


const app = express();

// Variables
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) =>{
    res.render("index.html");
});


// Server
app.listen(3000, () => {
    console.log(`Listening to the port ${PORT}`);
});