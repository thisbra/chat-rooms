const mongoose = require('mongoose');

const User = require('../modules/user/user.model');
const Room = require('../modules/room/room.model');
const Message = require('../modules/message/message.model');

async function addMessage(data) {
    const message = new Message({
        messageId: data.id,
        content: data.message,
        timestamp: data.timestamp,
        author: data.author,
        room: data.room
    })

    try {
        message.save();
    } catch (err) {
        console.log(err);
    }

    try {
        const roomObj = await Room.findOne({ name: data.room });
        roomObj.messageList.push(data.id);
        roomObj.save();  
    } catch (err) {
        console.log(err);
    }
}

// Get all messages from a room
async function getMessagesByRoomName(roomName) {
    try {
        const roomObj = await Room.findOne({ name: roomName });
        const messageList = roomObj.messageList;
        const messages = await Message.find({ messageId: { $in: messageList } });
        return messages;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addMessage,
    getMessagesByRoomName
}
