const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;