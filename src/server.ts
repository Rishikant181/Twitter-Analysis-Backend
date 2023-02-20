// PACKAGE LIBS
import express from 'express';

// Creating new express app instance
const app = express();

// Setting up express server
app.listen(3000, () => {
    console.log("Listening on port 3000");
});

// Setting up test endpoint
app.get('/', (req, res) => {
    res.sendStatus(200);
});