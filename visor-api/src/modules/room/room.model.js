const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  messageList: {
    type: [String],
    default: []
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;