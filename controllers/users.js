const express = require('express');
const user = express.Router();

user.get('/new', (req, res) => {
     res.render('user/new.ejs')
})


module.exports = user;