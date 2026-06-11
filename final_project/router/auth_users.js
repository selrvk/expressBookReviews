const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Helper: Check if username is valid (not already taken)
const isValid = (username) => {
    let usersWithSameName = users.filter((user) => user.username === username);
    return usersWithSameName.length === 0; 
};

// Helper: Check if username and password match
const authenticatedUser = (username, password) => {
    console.log("Current Users Array:", users); 
    
    let validUsers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    return validUsers.length > 0;
};

// Only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Error logging in" });
    }
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({ data: password }, 'access', { expiresIn: 60 * 60 });
        req.session.authorization = { accessToken, username };
        return res.status(200).json({ message: "Login successful!" });
    } else {
        return res.status(401).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add/Modify a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    if (books[isbn] && books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];
        // Change the message to match the requirement exactly
        return res.status(200).json({ message: `Review for ISBN ${isbn} deleted.` });
    }
    return res.status(404).json({ message: "Review not found" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    if (books[isbn]) {
        // Check if the user has a review for this book
        if (books[isbn].reviews[username]) {
            delete books[isbn].reviews[username];
            return res.status(200).json({ message: `Review for ISBN ${isbn} by user ${username} deleted.` });
        } else {
            return res.status(404).json({ message: "Review not found for this user." });
        }
    }
    return res.status(404).json({ message: "Book not found." });
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;