import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => console.log('Server running on http://localhost:8080'));

const mongoUrl = `mongodb+srv://neermoniruzzaman:xad5ArImlTwHMtz6@test.anemtkv.mongodb.net/?retryWrites=true&w=majority&appName=test`;

mongoose.Promise = Promise;
mongoose.connect(mongoUrl);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());