const express = require('express');
const session = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

// GET ROUTES
session.get('/new', (req, res) => {
     res.render('session/new.ejs')
})


// POST ROUTES
session.post('/', (req, res) => {
     User.findOne({username: req.body.username}, (err, foundUser) => {
          if(err){
               res.send('Sorry, something went wrong. Please try again in a bit.')
          } else if(!foundUser){
               res.send('Sorry, no user was found for that username.')
          } else{
               if(bcrypt.compareSync(req.body.password, foundUser.password)){
                    req.session.currentUser = {username: foundUser.username, firstname: foundUser.firstname, lastname: foundUser.lastname}
                    res.redirect('/routine')
               }else{
                    res.sendStatus(401)
               }
          }
     })
})

//DELETE ROUTE 
session.delete('/', (req, res) => {
     req.session.destroy()
     res.redirect('/')
})

module.exports = session;