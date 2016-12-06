const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema.
const usersSchema = new Schema({
student_name: {
    type: String,
    // unique:true
},
student_ID: {
    type: Number,
    // unique:true
}

})




// Create a model using schema.
const Users = mongoose.model('Users', usersSchema);

// Make this available to our Node applications.
module.exports = Users;