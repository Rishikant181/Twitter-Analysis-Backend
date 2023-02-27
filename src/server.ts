// PACKAGE LIBS
import express from 'express';

// ROUTERS
import TweetRouter from './routers/TweetRouter';
import UserRouter from './routers/UserRouter';
import AccountRouter from './routers/AccountRouter';

// MIDDLEWARES
import tweetErrorHandler from './middlewares/error/TweetError';
import userErrorHandler from './middlewares/error/UserError';

// Creating new express app instance
const app = express();

// Adding JSON middleware
app.use(express.json());

// Setting up express server
app.listen(3000, () => {
    console.log("Listening on port 3000");
});

// Adding additional routers
app.use('/tweets', TweetRouter, tweetErrorHandler);
app.use('/users', UserRouter, userErrorHandler);
app.use('/account', AccountRouter);

// Setting up test endpoint
app.get('/alive', (req, res) => {
    res.sendStatus(200);
});