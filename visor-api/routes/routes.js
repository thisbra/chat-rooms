const express = require('express');
const router = express.Router();

const User = require('../models/user');


//Post Method
router.post('/post', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        companies: req.body.companies
    })

    try {
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


//Get all Method
router.get('/users', async (req, res) => {
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/user/:id', (req, res) => {
    res.send(req.params.id)
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})


module.exports = router;