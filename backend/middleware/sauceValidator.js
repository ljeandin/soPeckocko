const validate = require('mongoose-validator'); //mongoose validation plugin

/***Input validation for the sauce creation and modification (will be used in models/sauce.js***/

//Sauce name, manufacturer and pepper validation
exports.stringValidation = (req, res, next) => {
  validate({
    validator: 'isLength',
    arguments: [2, 30], //string must be 2 to 30 characters long
    message: 'Le nom de la sauce doit contenir entre {ARGS[0]} et {ARGS[1]} caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /[\wÀ-ÿ '-]/, //string can contain any letter and number, accented letters, spaces, dashes and apostrophe
    matches: 'Le nom de la sauce ne doit pas contenir de caractères particuliers',
  })
}

//Sauce description validation
exports.descriptionValidation = (req, res, next) => {
  validate({
    validator: 'isLength',
    arguments: [10, 200], //description must be 10 to 200 characters long
    matches: 'La description doit contenir entre {ARGS[0]} et {ARGS[1]}',
  }),
  validate({
    validator: 'matches',
    arguments: /[\wÀ-ÿ '-?!.,]/, // description can contain any letter and number, accented letters, spaces, dashes, apostrophes and punctuation
    matches: 'La description ne doit pas contenir de caractères particuliers',
  })
}