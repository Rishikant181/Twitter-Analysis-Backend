// PACKAGE LIBS
import express from 'express';

// ROUTERS
import TweetRouter from './routers/TweetRouter';
import UserRouter from './routers/UserRouter';

// Creating new express app instance
const app = express();

// Setting up express server
app.listen(3000, () => {
    console.log("Listening on port 3000");
});

// Adding additional routers
app.use('/users', UserRouter);
app.use('/tweets', TweetRouter);

// Setting up test endpoint
app.get('/alive', (req, res) => {
    res.sendStatus(200);
});