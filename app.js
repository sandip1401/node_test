const express = require("express");
const app = express();
const http = require("http").Server(app);
require("dotenv").config();
const mongoose = require("mongoose");

// Database Connection

mongoose.connect('mongodb+srv://sandipgpay224:Sandip&14@cluster0.kvho0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json()); // Built-in body-parser middleware

// Routes
const personroutes = require("./routes/personroutes");
app.use("/", personroutes);

// Start Server
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
});


// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});