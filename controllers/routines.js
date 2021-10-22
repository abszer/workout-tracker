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
     res.send('this is the post route to create new data')
})


module.exports = routine;