const router = require('express').Router();
const Users = require('../models/Users'); //Getting the users model from the models folder

// ROUTES
//GET endpoint for getting all users
router.get('/', (req, res) => {
    Users.find({})
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});


//GET Endpoint for getting one specific user
router.get('/:student_name', (req, res) => {
    Users.find({"student_name":req.params.student_name})
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

//POST Endpoint for saving a new user
//localhost:8080/api/users    &   enter data in body to post. 
//select www-form-urlencoded

router.post('/', (req, res) => {
    //Unlike with postgres, mongoose will validate the new car before saving it into the database.
    //Even if extra information is sent in the request (like a yearsss property), it will be automatically ignored
  Users(req.body).save()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

//PUT Endpoint for updating users
router.put('/:student_ID', (req, res) => {
 
})

//DELETE Endpoint for deleting users
router.delete('/:student_name', (req, res) => {
})

module.exports = router;


