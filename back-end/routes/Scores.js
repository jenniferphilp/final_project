const router = require('express').Router();
const Scores = require('../models/Scores'); //Getting the Car model from the models folder



// localhost:8080/api/scores/80 --> this will display all documents with a percent of 80
//GET Endpoint for getting one specific score
//can only have one get request like this... otherwise 1st one will come back empty... i.e. localhost8080/scores/1200 ==> get request 
//for percent comes up first and there's no 1200 in percent key'
router.get('/:student_ID', (req, res) => {
    
    Scores.find({"student_ID":req.params.student_ID})
        .sort({createdAt: -1}) // sort Dates
        .limit(10)
        .then(scores => {
            res.json(scores);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})




//POST Endpoint for saving a new score
router.post('/', (req, res) => {
    //Unlike with postgres, mongoose will validate the new score before saving it into the database.
    //Even if extra information is sent in the request (like a yearsss property), it will be automatically ignored
    Scores(req.body).save()
        .then(scores => {
            res.json(scores);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

// PUT Endpoint for updating score
//need to find another way to write 'FindByIdAndUpdate'
router.put('/:percent', (req, res) => {
    Scores.find({"percent":req.params.percent})
    Scores.update(req.body)
    .then(scores => {
        res.json(scores);
    })
     .catch(err => {
            res.status(500).send(err);
        })
 })

//DELETE Endpoint for deleting score
router.delete('/:percent', (req, res) => {

})

//get endpoint for getting all scores
router.get('/', (req, res) => {
    Scores.find({})
        .then(scores => {
            res.json(scores);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

//get endpoint for searching by percent
// router.get('/percent', (req, res) => {
//  let percent=req.body.percent;
// });


module.exports = router;