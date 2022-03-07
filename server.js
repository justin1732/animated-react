//Dependencies
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const axios = require("axios")
//require models
const db = require("./models");
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//environment variables
const dotenv= require ('dotenv').config();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//Connect to MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/book";
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
        if (err) throw err;
        console.log("database connected")
    })
    .then(() => console.log("Database Connected!"))
    .catch(err => console.log(err));



// Define API routes here
//search route
app.get("/search/:search", (req, res) => {
  let search = req.params.search;
  // axios.get("https://www.googleapis.com/books/v1/volumes?q=" + search).then(function(response) {
  axios.get("https://api.jikan.moe/v4/anime?q=" + search).then(function(response) {
      let books = response.data.data
      console.log(books)
      let array =[];
      for(let i=0; i< books.length; i++) {
        if(books[i].type !== undefined && books[i].title !== undefined){
        let bookInfo = {
              title: books[i].title,
              type: books[i].type,
              description: books[i].synopsis,
              // image: books[i].volumeInfo.imageLinks.smallThumbnail,
              // link: books[i].volumeInfo.infoLink
          }
        array.push(bookInfo);  
      }}
      db.Book
            .create(array)
            .then(dbBook => res.json(dbBook))
            .catch(err => res.json(err))
    })
})
//get all saved books from db
app.get("/api/books", (req, res) => {
  db.Book
    .find({saved: true})
    .then(dbBook => res.json(dbBook))
    .catch(err => res.json(err))
})
//save a book to db
app.post("/api/books/:id", (req, res)  => {
  db.Book
    .findOneAndUpdate({_id: req.params.id}, {saved: true}, {new: true})
    .then(dbBook => {
      res.json(dbBook)
    })
})
//delete all unsaved books from db
app.delete("/api/books", (req, res) => {
  db.Book
    .deleteMany({saved: false})
    .then(dbBooks => res.json(dbBooks))
})
//delete a book from db /api/books/:id
app.delete("/api/books/:id", (req, res) => {
  db.Book
    .deleteOne({_id: req.params.id})
    .then(dbBook => res.json(dbBook))
})

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
