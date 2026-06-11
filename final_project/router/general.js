const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
const { users } = require("./auth_users.js");
const public_users = express.Router();


// Register a new user
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    
    // Check if user already exists
    const userExists = users.find(user => user.username === username);
    
    if (userExists) {
        return res.status(400).json({ message: "User already exists!" });
    }
    
    if (username && password) {
        users.push({ "username": username, "password": password });
        console.log("User registered! Total users:", users); // Debugging
        return res.status(200).json({ message: "User successfully registered. You can now login." });
    }
    return res.status(400).json({ message: "Username and password are required." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).send(JSON.stringify(books[isbn], null, 4));
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const booksByAuthor = Object.values(books).filter(book => book.author === author);
    return res.status(200).send(JSON.stringify(booksByAuthor, null, 4));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const booksByTitle = Object.values(books).filter(book => book.title === title);
    return res.status(200).send(JSON.stringify(booksByTitle, null, 4));
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
});

module.exports.general = public_users;
