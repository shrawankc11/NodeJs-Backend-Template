import express from 'express';
import apiRouter from './routes/index';
import errorMiddleware from './middleware/error.middleware';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static(__dirname + '/public'));

/*************Register API Router ********/
app.use('/api/v1', apiRouter);

app.get('/', (_, res) => {
    res.send(`<h1>API running at <base>/api/v1/*routes.</h1>`)
})

/************* Register required Middlewares ******/
app.use((_req, res) => {
    return res.status(404).json({ error: 'Not found!' })
})

app.use(errorMiddleware);



export default app;