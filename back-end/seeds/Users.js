const Users = require('../models/Users.js');

const usersToSeed = [
    {student_name: 'jen', student_ID: 12345},
    {student_name: 'branko', student_ID: 3456},
    {student_name: 'katie', student_ID: 5555},
    {student_name: 'mark', student_ID: 666}
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