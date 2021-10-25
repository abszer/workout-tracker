const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const routineSchema = new Schema({
     name: String,           
     exercises: [String],
     data: []
})

const Routine = mongoose.model("Routine", routineSchema)
module.exports = Routine;
