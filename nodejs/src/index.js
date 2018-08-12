import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import  cors  from 'cors';
import eventbriteAPI from 'node-eventbrite';

import users from './usersCtrl';
import categories from './categoriesCtrl'

const app = express();

// connect to Mongo when the app initializes
mongoose.connect('mongodb://localhost/test');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res, next) => {
    res.sendStatus(200);
});

app.get('/users', users.list);
app.post('/users', users.create);
app.post('/categories', categories.geteventsCategories);
app.get('/categories', categories.getEvents);


const server = app.listen(process.env.PORT || 3000, () => {
    const { port } = server.address();
    console.log(`Server listening on ${port}`);
});
