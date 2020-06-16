// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require("express");
var fs = require("fs");
var path = require("path");

// Sets up the reference to the json db for notes
//----------------------------------------------------------
const db = require("./db/db.json")

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port.
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
//----------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(express.json());


// HTML GET Requests
//----------------------------------------------------------

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// If no matching route is found default to home
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


// API Routes
//----------------------------------------------------------

app.get("/api/notes", function(req, res) {
  return res.json(db);
});

app.post("/api/notes", function(req, res) {
  db.push(req.body);
    res.json(true);
});

app.delete("/api/notes", function(req, res) {
  db.push(req.body);
    res.json(true);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
  console.log(db);
});
