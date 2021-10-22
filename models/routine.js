const mongoose = require('mongoose')
const routineDataSchema = require('../models/routineData.js')
const Schema = mongoose.Schema;


const routineSchema = new Schema({
     name: String,            // can't validate by requiring true for some reason. Try implementing check on POST request
     exercises: [String],
     data: [routineDataSchema]
})

const Routine = mongoose.model('Routine', routineSchema);
module.exports = Routine;
