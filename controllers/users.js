const express = require('express');
const user = express.Router();

user.get('/new', (req, res) => {
     res.render('user/new.ejs')
})


module.exports = user;


///////////////////////////////////


//////////////// TODO /////////////

// Day 1:

// 1. finish creating the routing

// 2. create basic forms for sign up
// and login

// 3. Create database funcitonality
//        a. create schema for user, session, and routines
//             (sessions schema will hold profile data and avatar)

// 4. Work on how routines info will be submitted, stored and parsed

////////////////////////////////////