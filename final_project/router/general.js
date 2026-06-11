const axios = require('axios');

// Helper function to simulate/call your own API
async function fetchFromAPI(endpoint) {
    try {
        const response = await axios.get(`http://localhost:5000/${endpoint}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Get the book list using async-await
public_users.get('/', async function (req, res) {
    try {
        const booksData = await fetchFromAPI('');
        return res.status(200).json(booksData);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

// Get book details based on ISBN using async-await
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        const isbn = req.params.isbn;
        const book = await fetchFromAPI(`isbn/${isbn}`);
        return res.status(200).json(book);
    } catch (error) {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Get book details based on author using async-await
public_users.get('/author/:author', async function (req, res) {
    try {
        const author = req.params.author;
        const booksByAuthor = await fetchFromAPI(`author/${author}`);
        return res.status(200).json(booksByAuthor);
    } catch (error) {
        return res.status(404).json({ message: "Author not found" });
    }
});

// Get all books based on title using async-await
public_users.get('/title/:title', async function (req, res) {
    try {
        const title = req.params.title;
        const booksByTitle = await fetchFromAPI(`title/${title}`);
        return res.status(200).json(booksByTitle);
    } catch (error) {
        return res.status(404).json({ message: "Title not found" });
    }
});