const fs = require("fs")
const app = require('express').Router()
const path = require("path");


app.get("/api/notes", function(req, res) {
    console.log("request recieved get all")
    fs.readFile("db/db.json","utf-8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);
        console.log(notes)
        res.json(notes)
    })
});
app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    console.log("New note: " +newNote.title);
    fs.readFile("db/db.json","utf-8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);
        console.log(notes)
        notes.push(newNote)
        updateDb(notes);
        res.json(notes)
    })
});
app.get("/api/notes/:id", function(req, res) {
    console.log("request recieved get one by id")
    fs.readFile("db/db.json","utf-8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);
        console.log(notes)
        res.json(notes[req.params.id]);
    })
});

app.delete("/api/notes/:id", function(req, res) {
    console.log("request recieved delete one by id")
    fs.readFile("db/db.json","utf-8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);
        console.log(notes)
        notes.splice(req.params.id, 1);
        updateDb(notes);
        res.json(notes)
    })
    console.log("Deleted note with id" +req.params.id);
});

app.get("/notes", function(req, res) {
    console.log("request recieved")
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("*", function(req, res) {
    console.log("request recieved")
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

function updateDb(notes) {
    fs.writeFile("db/db.json",JSON.stringify(notes, "\t"), err => {
        if (err) throw err;
        return true;
    })
}


module.exports = app