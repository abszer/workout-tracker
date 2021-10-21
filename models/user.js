const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     username: {type: String, required: true, unique: true},
     password: {type: String, required: true},
     firstname: {type: String, required: true},
     lastname: {type: String, required: true},
     weight: Number,
     height: Number,
     data: Array // this is where the dataschema will be placed
})

const User = mongoose.model('User', userSchema);
module.exports = User;