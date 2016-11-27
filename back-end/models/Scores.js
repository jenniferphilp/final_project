const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema.
const ScoresSchema = new Schema({

student_ID: Number,
gameType: String,
percent: Number,
totalTime: Number,
createdAt:Date
})


ScoresSchema.pre('save', function(next) {
    //get the current date.
    const currentDate = new Date();

    this.createdAt = currentDate;

next();

});

// Create a model using schema.
const Scores = mongoose.model('Scores', ScoresSchema);

// Make this available to our Node applications.
module.exports = Scores;