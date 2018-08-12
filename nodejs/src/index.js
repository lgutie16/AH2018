import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import users from './usersCtrl';
import  cors  from 'cors';

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

const server = app.listen(process.env.PORT || 3000, () => {
    const { port } = server.address();
    console.log(`Server listening on ${port}`);
});
