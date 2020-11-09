const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//Declaring routes
const sauceRoutes = require('./routes/Sauce');
const userRoutes = require('./routes/User');

//Requiring dotenv (to hide mongoose password and name)
require('dotenv').config()

//mongoose connexion
mongoose.connect(
	'mongodb+srv://' + process.env.NAME + ':' + process.env.PASSWORD + '@' + process.env.LINK ,
	{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
  	console.log('Connexion à MongoDB réussie !');
  })
  .catch(() => {
  	console.log('Connexion à MongoDB échouée !');
});

//app start
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

//path to sauces and authentification APIs
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;