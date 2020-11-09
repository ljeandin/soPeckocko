const mongoose = require('mongoose'); //mongoose for modeling data
const sauceValidator = require('../middleware/sauceValidator'); // importing sauce validation middleware

const sauceSchema = mongoose.Schema({
  userId: {type: String, required: true},
  name: {type: String, required: true, validate: sauceValidator.stringValidation},
  manufacturer: {type: String, required: true, validate: sauceValidator.stringValidation},
  description: {type: String, required: true, validate: sauceValidator.descriptionValidation},
  mainPepper: {type: String, required: true, validate: sauceValidator.stringValidation},
  imageUrl: {type: String, required: true},
  heat: {type: Number, required: true},
  likes: {type: Number, required: true},
  dislikes: {type: Number, required: true},
  usersLiked: {type: [String], required: true},
  usersDisliked: {type: [String], required: true},
});

module.exports = mongoose.model('Sauce', sauceSchema);