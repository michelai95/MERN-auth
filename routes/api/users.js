require('dotenv').config()
const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = ('jsonwebtoken')
const passport = require('passport')

// load user model
const User = require('../../models/User')

// API routes 
// user test route 
router.get('/test', (req, res) => {
    res.json({msg: 'Users endpoint working'})
})

// GET route to handle user registration
// send error if user already exists 
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
            if (user) { 
            return res.status(400).json({email: 'Email already exists'})
            // else create new user 
        } else {
            // create avatar from gravatar 
            const avatar = gravatar.url.apply(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })
            // how to hash your password 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    // if error throw error 
                    if (err) throw err
                    // if no error set password to hash pass
                    newUser.password = hash
                    newUser.save()
                    // delete json send for security long term
                        .then(user => res.status(207).json(user))
                        .catch(err => console.log(err))
                }) 
            })
        }
    })
})



// if not - register the user 
// GET route to log people in and check their credentials against existing user data
// GET if already logged in, set user data to current 

module.exports = router