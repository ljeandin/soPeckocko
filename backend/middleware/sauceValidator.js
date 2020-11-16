const validate = require('mongoose-validator'); //mongoose validation plugin

/***This is the input validation for the sauce creation and modification (will be used in models/sauce.js)***/
  
 //Sauce name, manufacturer and pepper validation
exports.stringValidation = [
  validate({
    validator: 'matches',
    arguments: /^[\wÀ-ÿ \-']+$/, //string can contain any letter and number, accented letters, spaces, dashes and apostrophe
    message: 'Ce champ ne doit pas contenir de caractères particuliers'
  }),
];

//Sauce description validation
exports.descriptionValidation = [
  validate({
    validator: 'matches',
    arguments: /^[\w\r\nÀ-ÿ \-'?!.,()]+$/, // description can contain any letter and number, linebreaks, accented letters, spaces, dashes, apostrophes, punctuation and parentheses
    message: 'La description ne doit pas contenir de caractères particuliers'
  }),
];
