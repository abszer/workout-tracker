const express = require('express');
const fs = require('fs')
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
                    currentUser: req.session.currentUser
               })
          }
     })
})

routine.get('/:id/edit', (req, res) => {
     User.findOne({username: req.session.currentUser.username}, (err, foundUser) => {
          if(err){
               res.send(err.message)
          }else{
               res.render('routine/edit.ejs', {
                    currentUser: req.session.currentUser,
                    routine: foundUser.routines.id(req.params.id)
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

routine.post('/finish/:id', (req, res) => {

     const dataObj = {}
     // add exercise type to name in the html and hope for the best
     for(const item in req.body){
          let type = item.slice(0, item.indexOf('-'))
          let exerciseName = item.slice(item.indexOf('-') + 1, item.length)
          if(type !== "duration" && !(dataObj[exerciseName]) ){
               dataObj[exerciseName] = {
                    reps: [],
                    weight: []
               }
          }
          if(type === "reps"){
               dataObj[exerciseName].reps.push(req.body[item])
          }
          if(type === "weight"){
               dataObj[exerciseName].weight.push(req.body[item])
          }
          if(type === 'duration' && !(dataObj[exerciseName])){
               dataObj[exerciseName] = {
                    reps: []
               }
          }
          if (type == 'duration'){
               dataObj[exerciseName].reps.push(req.body[item])
          }

     }

     //Assign date for workout: 
     dataObj['date'] = (new Date).toString()

     User.findOne({username: req.session.currentUser.username}, (err, foundUser) => {
          if(err){
               res.send('Could not find user: ' + err.message)
          } else{
               foundUser.dailyHistory.push(dataObj.date)
               foundUser.routines.id(req.params.id).data.push(dataObj)
               foundUser.save().then((data) => {
                    console.log(data)
                    res.redirect('/')
               }).catch((err) => {
                    res.send('something went wrong trying to save data: ' + err.message)
               })
          }
     })
})


routine.post('/:id', (req, res) => {

     // Apply remove: If exercise has "removed" string then splice from the array and update req.body
     const recursiveRemove = (arr, keyword) => {
          if(!arr.includes(keyword)){
               console.log('function end' + arr)
               return;
          }
          arr.splice(arr.indexOf(keyword), 1)
          console.log(arr)
          recursiveRemove(arr, keyword)
     }


     recursiveRemove(req.body.exercises, 'removed')

     User.findOne({username: req.session.currentUser.username}, (err, foundUser) => {
          if(err){
               res.send("There was an issue with the database. Uh oh." + "\n" + err.message)
          }else{
               const routines = foundUser.routines.id(req.params.id)
               routines.name = req.body.name
               routines.exercises = req.body.exercises
               foundUser.save().then((savedData) => {
                    console.log(savedData)
                    res.redirect('/routine/' + req.params.id)
               }).catch((err) => {
                    res.send("There was an error processing this update to the database")
               })
          }
     })
})


// DELETE ROUTES
routine.delete('/:id', (req, res) => {
     User.findOne({username: req.session.currentUser.username}, (err, foundUser) => {
          if(err){
               res.send(err.message)
          }else{
               foundUser.routines.id(req.params.id).remove();
               foundUser.save((err) => {
                    if(err){
                         res.send("Could not delete routine: " + err.message)
                    }else{
                         console.log("routine was deleted")
                         res.redirect('/routine')
                    }
               })
          }
     })
})


module.exports = routine;