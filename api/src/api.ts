import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import fs from 'fs';

import { connect } from 'mongoose';

import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { initializeSocket } from './socketServer/socketServer.js';

import sensorsRouter from './routes/sensorRouter.js';
import activityRouter from './routes/activityRouter.js';
import fieldRouter from './routes/fieldRouter.js';
import plotsRouter from './routes/plotRouter.js';

dotenv.config();

let server : http.Server;
const app: Express = express();

console.log('Starting HTTP server');
server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
initializeSocket(io);

const allowedOrigins = ["http://localhost:5173"];
const options: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
};

const mongoUrl = "mongodb://172.17.0.2/hackathon";
connect(mongoUrl ?? '').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});

app.use(cors(options));
app.use(express.json());
app.use("/sensors", sensorsRouter);
app.use("/activities", activityRouter);
app.use("/fields", fieldRouter);
app.use("/plots", plotsRouter);

const port = 3000;

server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at port ${port}`);
});