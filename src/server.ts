// PACKAGE LIBS
import express from 'express';
import TwitterContext from './data/twitter/TwitterContext';

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

const context = new TwitterContext('kdt=Gtxwg9QKD4yM3OIP21Vfj76xV4jZKl9XDIL5yxrB; expires=Fri, 09 Aug 2024 10:24:44 GMT; domain=.twitter.com; path=/; secure; httponly;twid=\"u=1418940387037782018\"; expires=Tue, 08 Feb 2028 10:24:44 GMT; domain=.twitter.com; path=/; secure;ct0=90efa6746e5559abad3017c890bdcc0e; expires=Thu, 09 Feb 2023 16:24:44 GMT; domain=.twitter.com; path=/; secure;auth_token=ab7c216149d583de58e745f3232b0235f883d400; expires=Tue, 08 Feb 2028 10:24:44 GMT; domain=.twitter.com; path=/; secure; httponly');
context.users.likes('44196397', 253, '').then(res => console.log(res));