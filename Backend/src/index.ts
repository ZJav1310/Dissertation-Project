import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Server } from "socket.io";
import http from 'http';

import route from './routes';
import logger from './utils/Logger';

const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
// redirect to routes/index.js
app.use('/', route);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

// app.listen(port, () => {
//     console.log(`server is running on port ${port}`);
// });


// const io = new socketio.Server(server, {
//     cors: {
//       origins: ['http://localhost:8080']
//     }
// });

const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080"
    }
});


io.on('connection', (socket) => {
    logger.http('a user connected');
    socket.on('disconnect', () => {
        logger.http('user disconnected');
    });
});


// io.on("connection", (...params) => {
//     console.log(params);
// });
