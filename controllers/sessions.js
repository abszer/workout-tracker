const express = require('express');
const session = express.Router();
const bcrypt = require('bcrypt');

session.get('/new', (req, res) => {
     res.send("This will be the log in page")
})

module.exports = session;