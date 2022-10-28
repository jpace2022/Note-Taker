// These require dependents
const express = require("express");
const fs = require("fs");
const path = require("path");

// Route file 
const routes = require("./routes/routes");

// Starts the express app
const app = express();
const PORT = process.env.PORT || 3000;

// Data seperation
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(routes)

// Listener
app.listen(PORT, function(){
    console.log("App listen on PORT: " + PORT);
});