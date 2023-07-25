// Imports
const express = require("express");
require("dotenv").config();
const connectDb = require("./config/database");
const User = require("./models/messageModel"); 


const app = express();

// Middlewares
app.use(express.static("public"));

app.use((req, res, next) => {
    req.url = req.url.toLowerCase();
    next();
  });

  app.use(express.urlencoded({extended: true}));

  // Database Connection
  connectDb();


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

app.post('/submit', async (req, res) => {
    try {
      const { name, email, message} = req.body;
      const user = new User({ name, email, message});
      await user.save();
      res.send("Successfully sent the message, I will get in touch with you soon!");
    } catch (error) {
      res.status(500).send("An error occured while sending the message!");
      
    }
  });


// Server
app.listen(3000, () => {
    console.log(`Listening to the port ${PORT}`);
});