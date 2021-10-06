
 const {User} = require('../models/user.model');

 const express = require('express');
 const router = express.Router();
 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 


// getting users
router.get('/', async (req, res) => {
    const userList = await User.find().select('-passwordHash')
    if(!userList){
        return res.status(500).json({success: false, message: 'users can not be found'});

    }
    res.send(userList);
})


// creating user
router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email:req.body.email,
        passwordHash:bcrypt.hashSync(req.body.password,16),
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        street:req.body.street,
        apartment:req.body.apartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country

    })
    user = await user.save();
    if(!user) {
        res.status(404).send('the user was not created')
    }

    res.send(user)
});

// find a user with its id 
router.get('/:id', async (req, res) => {
       // check if the id is a valid mongo id 
       if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({success: false, message:"invalid user id"})
    }

    let user = await User.findById(req.params.id).select('-passwordHash');
    if(!user){
        return res.status(500).json({success: false, message: "user does exist"})
    }
    res.send(user);
})

// updating user details
router.put('/:id', async (req, res) => {
       // check if the id is a valid mongo id 
   if(!mongoose.isValidObjectId(req.params.id)){
    return res.status(400).json({success: false, message:"invalid product id"})
}

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email:req.body.email,
            passwordHash:req.body.passwordHash,
            phone:req.body.phone,
            isAdmin:req.body.isAdmin,
            street:req.body.street,
            apartment:req.body.apartment,
            zip:req.body.zip,
            city:req.body.city,
            country:req.body.country
        },
        {new: true}

        );

        if(!user) {
            return res.status(500).json({success: false, message:'user detail could not be updated'})
        }
        res.send(user)

})

// user login 
router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    const jwt_secret = process.env.jwt_secret;
    if(!user) {
        return res.status(400).json({success: false, message:'email or password does not match'})
    }
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
       const token = jwt.sign(
           {
               userId: user.id
           },
           jwt_secret,
           {expiresIn: '7d'}
       )
        return res.status(200).send({user: user.email, token: token});
    }else{
        return res.status(400).send('email or password does not match')
    }
   
})

module.exports = router;