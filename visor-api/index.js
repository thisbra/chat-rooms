require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
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

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})