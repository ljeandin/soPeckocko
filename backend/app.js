const express = require('express'); // we'll use express to build the app
const bodyParser = require('body-parser');// body parser to read form input and storing it as JS object
const mongoose = require('mongoose');// mongoose import
const path = require('path');// path is used to make path manipulation easier 
const mongodbErrorHandler = require('mongoose-mongodb-errors');//mongodbErrorHandler to make sure database errors are handled
mongoose.plugin(mongodbErrorHandler);

//Declaring routes
const sauceRoutes = require('./routes/Sauce');
const userRoutes = require('./routes/User');

//Requiring dotenv (to hide mongoose connexion password and name -see right below)
require('dotenv').config()

//Mongoose connexion
mongoose.connect(
	'mongodb+srv://' + process.env.NAME + ':' + process.env.PASSWORD + '@' + process.env.LINK ,
	{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
  	console.log('Connexion à MongoDB réussie !');
  })
  .catch(() => {
  	console.log('Connexion à MongoDB échouée !');
});

//Using express
const app = express();

//headers for avoiding CORS problems
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//using bodyParser
app.use(bodyParser.json());

//path to images
app.use('/images', express.static(path.join(__dirname, 'images')));

//path to sauces and authentication in the API
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;