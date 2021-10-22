const express = require('express');
const routine = express.Router();
const Routine = require('../models/routine.js')
const User = require('../models/user.js')

//GET ROUTES
routine.get('/', (req, res) => {
     User.findOne({username: req.session.currentUser.username}, (err, foundUser) => {
          if(err){
               res.send(err.message)
          }else{
               req.session.currentUser['routines'] = foundUser.routines;
               res.render('routine/index.ejs', {
                    currentUser: req.session.currentUser,
                    routines: req.session.currentUser.routines
               });
          }
     })
})

routine.get('/new', (req, res) => {
     res.render('routine/new.ejs', {
          currentUser: req.body.currentUser
     });
})

routine.get('/:id', (req, res) => {
     User.findOne({username: req.session.currentUser.username}, (err, foundUser) => {
          if(err){
               res.send(err.message)
          }else{
               res.render('routine/show.ejs', {
                    routine: foundUser.routines.id(req.params.id),
                    currentUser: req.body.currentUser
               })
          }
     })
})

// POST ROUTES
routine.post('/', (req, res) => {
     //create an array from the exercises input string
     const exerciseArray = req.body.exercises.split(',');
     exerciseArray.shift()
     req.body.exercises = exerciseArray;
     const newRoutine = new Routine(req.body)

     User.findOne({username: req.session.currentUser.username}, (err, foundUser) => {
          if(err){
               res.send(err.message)
          }else{
               foundUser.routines.push(newRoutine)
               foundUser.save().then((savedUser) => {
                    res.redirect('/routine')
               }).catch(() => {
                    res.send("Sorry, an error has ocurred trying to process your routine data. Please try again.")
               })
          }
     })
})


module.exports = routine;