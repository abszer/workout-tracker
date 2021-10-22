const mongoose = require('mongoose');
const Routine = require('../models/routine.js')
const Schema = mongoose.Schema;

const userSchema = new Schema({
     username: {type: String, required: true, unique: true},
     password: {type: String, required: true},
     firstname: {type: String, required: true},
     lastname: {type: String, required: true},
     weight: Number,
     height: Number,
     avatar: String,
     dailyHistory: Array,   // store when user goes to the gym
     routines: [Routine.schema] // this is where the routine schema will be placed
})

const User = mongoose.model('User', userSchema);
module.exports = User;