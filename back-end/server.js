const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const router = require('./router');  

const PORT = process.env.PORT || 8080;


// COMMENT THIS OUT TO RUN REACT APP ON LOCAL HOST 3000
 app.use(express.static(__dirname + '/build'));



// app.use(express.static('public'));

//middleware for changing request or response object before getting handled by our app
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
 next();
});

mongoose.Promise = global.Promise; 

// connect to local host
// mongoose.connect('mongodb://localhost/data/db/');

//connect to mLab using name (Jen) and password (argyle)
mongoose.connect('mongodb://Jen:argyle@ds113628.mlab.com:13628/final_project');

//Seed our users
const usersToSeed = require('./seeds/Users');
usersToSeed();

// Log to console any errors or a successful connection.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to db at /data/db/")
});









//handles the post request on the client side (submitting data for users)
// app.post('/users', (req, res)=>{
// db.collection('users').save(req.body, (err, result)=> {
// 	if (err) return console.log(err)

// 	console.log('saved to database')
// 	res.redirect('/')
// 	})
// })

// app.post('/users', (req, res)=>{
// db.collection('scores').save(req.body, (err, result)=> {
// 	if (err) return console.log(err)

// 	console.log('score saved to database')
// 	res.redirect('/')
// 	})
// })

//import endpoints...
const Users_routes = require('./routes/Users');
const Scores_routes = require('./routes/Scores'); 



//Use our imported routers whenever a requests starts with /api/users or /api/scores
app.use('/api/users', Users_routes);
app.use('/api/scores', Scores_routes);

//creates a new User or Score... be sure to comment out!
// let newScore = Scores({
//     student_ID: 1234,
// 	gameType: "Numeracy 1",
// 	percent: 90,
// 	totalTime: 100,
//     });



app.listen(PORT, () => {
	console.log('Listening on Port:', PORT);
	console.log('Press CTRL + C to stop server');
});


app.get('*', function(req, res) {
   res.sendFile((__dirname + '/build/index.html'));
});