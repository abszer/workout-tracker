const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const routineSchema = new Schema({
     name: String,            // can't validate by requiring true for some reason. Try implementing check on POST request
     exercises: [String],
     data: [{
          exercise: [String],
          reps: [{type: Number}],    // array of objects containing number of sets and reps for each exercise
          weight: [{type: Number}],  // array of objects containing weights for each exercise set of sets
          date: {type: Date, default: Date.now()}
     }]
})

const Routine = mongoose.model("Routine", routineSchema)
module.exports = Routine;
