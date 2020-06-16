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


// API Routes
//----------------------------------------------------------

app.get("/api/notes", function(req, res) {
  // Return existing notes
  return res.json(db);
});

app.post("/api/notes", function(req, res) {
    // Add new note to end of db array
    db.push(req.body);

    // Reset ids for the larger array
    for (var i = 1; i<= db.length; i++){
      db[i-1].id = i;
}

    // Write out to db file with the new note
    fs.writeFileSync("./db/db.json", JSON.stringify(db, null, 2));
  
    // return notes
    res.json(db);
});

app.delete("/api/notes/:id", function(req, res) {
  // Remove the selected note from array
  db.splice(req.params.id-1, 1);

  // Reset ids for the smaller array
  for (var i = 1; i<= db.length; i++){
      db[i-1].id = i;
  }
   // Write out to db file with the new note
   fs.writeFileSync("./db/db.json", JSON.stringify(db, null, 2));

   // Return notes
  res.json(db);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
