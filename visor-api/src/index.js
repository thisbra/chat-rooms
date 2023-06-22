require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoString = process.env.MONGODB_URL;
const routes = require('./routes/routes');
const { addMessage } = require('./repository/repository');

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

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log('User ' + socket.id + 'Joined Room: ' + data);
    });

    socket.on('send_message', (data) => {
        console.log(data);
        addMessage(data);
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("Socket Disconnected: " + socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})