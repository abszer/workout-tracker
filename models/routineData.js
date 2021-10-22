const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routineDataSchema = new Schema({
     exercise: [String],
     reps: [{type: Number}],    // array of objects containing number of sets and reps for each exercise
     weight: [{type: Number}],  // array of objects containing weights for each exercise set of sets
     date: {type: Date, default: Date.now()}
}, 
     {timestamps: true}
)

module.exports = routineDataSchema;