// Imports
const express = require("express");
const ejs = require("dotenv").config();


const app = express();

// Middlewares
app.use(express.static("public"));

app.use((req, res, next) => {
    req.url = req.url.toLowerCase();
    next();
  });


// Variables
const PORT = process.env.PORT || 4000;

// Routes
app.get("/", (req, res) =>{
    res.sendFile(__dirname+"/public/index.html");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname+"/public/about.html");
});

app.get("/development", (req, res) => {
    res.sendFile(__dirname+"/public/projects/comingSoon.html");
});


// Server
app.listen(3000, () => {
    console.log(`Listening to the port ${PORT}`);
});