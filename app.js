// Imports
const express = require("express");
require("dotenv").config();
const connectDb = require("./config/database");
const Message = require("./models/messageModel");
const Admin = require("./models/adminModel");
const bodyParser = require('body-parser');
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authGuard = require("./middlewares/authGuard");


const app = express();

// Middlewares
app.use(express.static("public"));
app.use(cookieParser());

app.use((req, res, next) => {
    req.url = req.url.toLowerCase();
    next();
  });

app.set("view engine", "ejs");

  // app.use(express.urlencoded({extended: true}));
  // app.use(express.json());
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

  // Database Connection
  connectDb();


// Variables
const PORT = process.env.PORT || 4000;

// Routes and Handlers
app.get("/", (req, res) =>{
    res.sendFile(__dirname+"/public/index.html");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname+"/public/about.html");
});

app.get("/development", (req, res) => {
    res.sendFile(__dirname+"/public/projects/comingSoon.html");
});

// Admin panel
app.get("/admin", (req, res) => {
  res.render("adminLogin");
});

// Admin Login
app.post("/admin", async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await Admin.findOne({email});
    if(user){
      const passwordMatched = await bcrypt.compare(password, user.password);
      if(passwordMatched){
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('jwtlogin', token, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.redirect("adminpanel");

      } else{
        res.status(401).send("Username or password is incorrect");
      }
    } else{
      res.status(401).send("Username or password is incorrect");
    }
  } catch (error) {
    console.log(error.message);
  }
  
});

app.get("/adminpanel", authGuard, async (req, res) => {
  try {
    // Show Messages
  let messages = await Message.find();
  let admins = await Admin.find();
  res.render("adminPanel", {messages, admins});
  } catch (error) {
    console.log(error.message);
  }
  

});

// Adding Admin
app.post("/adminpanel", async (req, res) => {
  try {
    const {email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({
    email,
    password: hashedPassword
  });
  await admin.save();
  res.send("Successfully added new admin!");
  } catch (error) {
    console.log(error.message);
  }
  

});

app.post('/submit', async (req, res) => {
    try {
      const { name, email, message} = req.body;
      const msg = new Message({ name, email, message});
      await msg.save();
      res.send("Successfully sent the message, I will get in touch with you soon!");
    } catch (error) {
      res.status(500).send("An error occured while sending the message!");
      
    }
  });

  // Log out
  app.post("/logout", (req, res) => {
    res.clearCookie("jwtlogin");
    res.status(200).json({ message: 'Logged out successfully' });
  });


// Server
app.listen(3000, () => {
    console.log(`Listening to the port ${PORT}`);
});