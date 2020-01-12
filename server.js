const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// configuring the database
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');

// connecting to database
mongoose.connect(dbConfig.url, {useNewUrlParser: true})
	.then(() => {
		console.log("Connected to database successfully");
	}).catch(error => {
		console.log("Could not connect to database. Exiting now...", error);
		process.exit();
	})

// define a simple route - Testing Purpose
app.get('/', (req, res) => {
	res.json({
		'message': 'Welcome to easy application.'
	})
})

// require notes routes
require('./app/routes/note.routes')(app);

// listen for requests
app.listen(3000, () => {
	console.log("Server is up and running at port 3000");
})

module.exports = app;
