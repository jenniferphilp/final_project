const Users = require('../models/Users.js');
const usersToSeed = [
    {student_name: 'Jen', student_ID: 1234},
    {student_name: 'Branko', student_ID: 3456},
    {student_name: 'Katie', student_ID: 5555},
    {student_name: 'Mark', student_ID: 666}
] 

// We export an anonymous function that will be run when the server starts
module.exports = () => {
    //Check to see if there are any databases, should only seed if database table is empty
    Users.find({}, (err, users) => {
        if (err) {
            console.log(err)
        } else {
            if (users.length === 0) {
           
                Users.create(usersToSeed, (err, users) => {
                    console.log(users)
                })
            }
        }
    })
}