const axios = require('axios');

// Get all books using async-await
async function getAllBooks() {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log("Task 10 (All Books):", response.data);
    } catch (error) {
        console.error(error);
    }
}

// Get book by ISBN using async-await
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        console.log("Task 11 (By ISBN):", response.data);
    } catch (error) {
        console.error(error);
    }
}

// Get books by Author using async-await
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log("Task 12 (By Author):", response.data);
    } catch (error) {
        console.error(error);
    }
}

// Get books by Title using async-await
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log("Task 13 (By Title):", response.data);
    } catch (error) {
        console.error(error);
    }
}

// Execute calls
getAllBooks();
getBookByISBN(1);
getBooksByAuthor("Chinua Achebe");
getBooksByTitle("Things Fall Apart");