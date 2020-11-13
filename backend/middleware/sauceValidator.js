const validate = require('mongoose-validator'); //mongoose validation plugin

/***This is the input validation for the sauce creation and modification (will be used in models/sauce.js***/

//Sauce name, manufacturer and pepper validation
exports.stringValidation = [
  validate({
    validator: 'isLength',
    arguments: [2, 30], //string must be 2 to 30 characters long
    message: 'Ce champ doit contenir entre {ARGS[0]} et {ARGS[1]} caractères'
  }),
  validate({
    validator: 'matches',
    arguments: /[\wÀ-ÿ \-']/, //string can contain any letter and number, accented letters, spaces, dashes and apostrophe
    matches: 'Ce champ ne doit pas contenir de caractères particuliers'
  })
];

//Sauce description validation
exports.descriptionValidation = [
  validate({
    validator: 'isLength',
    arguments: [10, 1000], //description must be 10 to 1000 characters long
    matches: 'La description doit contenir entre {ARGS[0]} et {ARGS[1]}'
  }),
  validate({
    validator: 'matches',
    arguments: /[\wÀ-ÿ \-'?!.,]/, // description can contain any letter and number, accented letters, spaces, dashes, apostrophes and punctuation
    matches: 'La description ne doit pas contenir de caractères particuliers'
  })
];
