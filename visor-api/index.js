require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoString = process.env.MONGODB_URL;
const routes = require('./routes/routes');

const PORT = 3005

mongoose.connect(mongoString);
const db = mongoose.connection;


db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', routes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('Socket Connected: ' + socket.id);

    socket.on("disconnect", () => {
        console.log("Socket Disconnected: " + socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})