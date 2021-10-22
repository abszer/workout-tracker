const express = require('express');
const routine = express.Router();
const Routine = require('../models/routine.js')

//GET ROUTES
routine.get('/', (req, res) => {
     res.render('routine/index.ejs', {
          currentUser: req.session.currentUser
     });
})

routine.get('/new', (req, res) => {
     res.render('routine/new.ejs', {
          currentUser: req.body.currentUser
     });
})

// POST ROUTES
routine.post('/', (req, res) => {
     //create an array from the exercises input string
     const exerciseArray = req.body.exercises.split(',');
     exerciseArray.shift()
     req.body.exercises = exerciseArray;
     Routine.create(req.body, (err, data) => {
          if(err){
               res.send("Uh oh. Something went wrong." + err.message)
          }else{
               res.redirect('/routine')
          }
     })
})


module.exports = routine;