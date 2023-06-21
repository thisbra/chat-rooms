const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  messageList: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    default: []
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;