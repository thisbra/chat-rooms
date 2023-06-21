const express = require('express');
const router = express.Router();

const User = require('../modules/user/user.model');
const Room = require('../modules/room/room.model');
const Message = require('../modules/message/message.model');

// POST Method
router.post('/users', async (req, res) => {
  const user = new User({
    userId: req.body.userId,
    username: req.body.username
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET All Method
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET by ID Method
router.get('/users/userId/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET by username Method
router.get('/users/username/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE by ID Method
router.delete('/users/:userId', async (req, res) => {
    try {
        await User.deleteOne({ userId: req.params.userId });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// POST Method for rooms
router.post('/rooms', async (req, res) => {
    try {
      const room = new Room({
        id: req.body.roomId,
        name: req.body.name,
        messageList: []
      });
      const newRoom = await room.save();
      res.status(201).json(newRoom);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// GET All Method for rooms
router.get('/rooms', async (req, res) => {
try {
    const rooms = await Room.find();
    res.json(rooms);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// GET by ID Method for rooms
router.get('/rooms/roomId/:roomId', async (req, res) => {
try {
    const room = await Room.findOne({ id: req.params.roomId });
    res.json(room);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// GET room by name Method for rooms
router.get('/rooms/name/:name', async (req, res) => {
try {
    const room = await Room.findOne({ name: req.params.name });
    res.json(room);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// DELETE by ID Method for rooms
router.delete('/rooms/:roomId', async (req, res) => {
try {
    await Room.deleteOne({ id: req.params.roomId });
    res.json({ message: 'Room deleted successfully' });
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// POST Method for messages
router.post('/messages', async (req, res) => {
try {
    const message = new Message({
    id: req.body.messageId,
    content: req.body.content,
    timestamp: req.body.timestamp,
    author: req.body.author,
    room: req.body.room
    });
    const newMessage = await message.save();
    res.status(201).json(newMessage);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// GET All Method for messages
router.get('/messages', async (req, res) => {
try {
    const messages = await Message.find();
    res.json(messages);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// GET by ID Method for messages
router.get('/messages/:messageId', async (req, res) => {
try {
    const message = await Message.findOne({ id: req.params.messageId });
    res.json(message);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// DELETE by ID Method for messages
router.delete('/messages/:messageId', async (req, res) => {
try {
    await Message.deleteOne({ id: req.params.messageId });
    res.json({ message: 'Message deleted successfully' });
} catch (err) {
    res.status(500).json({ message: err.message });
}
});



module.exports = router;