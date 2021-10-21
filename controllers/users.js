const express = require('express');
const bcrypt = require('bcrypt');
const user = express.Router();


const User = require('../models/user.js')

// GET ROUTES

user.get('/new', (req, res) => {
     res.render('user/new.ejs')
})


// POST ROUTES
user.post('/', (req, res) => {
     //IMPLEMENT SERVER SIDE CHECKS FOR TYPE/LENGTH REQUIREMENTS but not today
     
     req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
     req.body.firstname = req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.slice(1, req.body.firstname.length);
     req.body.lastname = req.body.lastname.charAt(0).toUpperCase() + req.body.lastname.slice(1, req.body.lastname.length);
     req.body.height = parseInt(req.body.height);
     req.body.weight = parseInt(req.body.weight);
     
     User.create(req.body, (err, createdUser) => {
          if(err){
               res.send('There was a problem with the database. Please try again in a few moments.')
               console.log(err)
          }else{
               console.log(createdUser)
               res.redirect('/session/new')
          }
     })
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