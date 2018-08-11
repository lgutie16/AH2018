import express from 'express';
import bodyParser from 'body-parser';
import analysis from './analysis';
import  cors  from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res, next) => {
    res.sendStatus(200);
});

app.use('/api/analysis', analysis);

const server = app.listen(process.env.PORT || 3000, () => {
    const { port } = server.address();
    console.log(`Server listening on ${port}`);
});
