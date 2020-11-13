const bcrypt = require('bcrypt'); //hashing plugin
const jwt = require('jsonwebtoken'); //JSON webtoken plugin
const passwordValidator = require('password-validator'); //password validation plugin (setting it up below)
const maskData = require('maskdata');//mask data is used to hide part of the data

const User = require('../models/user'); //importing model

/***Setting up the password validation***/
var schema = new passwordValidator();

schema //for the password validation
	.is().min(6) //min 6 characters
	.is().max(20) //max 20 characters
	.has().uppercase() //at least one uppercase letter
	.has().lowercase() //at least one lowercase letter
	.has().digits(1) //at least one digit

/***Signup controller***/
exports.signup = (req, res, next) => {
	if(!schema.validate(req.body.password)){
		throw { error: 'Le mot de passe doit faire entre 6 et 20 caractères et contenir 1 majuscule, 1 minuscule et 1 chiffre minimum'} //error if password not secure enough
	}else{
	bcrypt.hash(req.body.password, 10) //password hashing
	.then(hash => {
		const user = new User({ //setting up new user
			email: maskData.maskEmail2(req.body.email), //getting email and masking it (with maskEmail2 and not maskEmail, because it's prone to bugs)
			password: hash //getting hashed password
		})
		user.save() //saving new user
			.then(() => res.status(201).json({message: 'Utilisateur créé'}))
			.catch(error => res.status(400).json({ error }));
	})
	.catch(error => res.status(500).json({ error: 'Le mot de passe doit faire entre 6 et 20 caractères et contenir 1 majuscule, 1 minuscule et 1 chiffre minimum' }));
	}
};

/***Login controller***/
exports.login = (req, res, next) => {
	User.findOne({ email: maskData.maskEmail2(req.body.email) }) //getting email and making it go through the same masking process to "decode" it
		.then(user => {
			if (!user) { //if user not found, error message
				return res.status(401).json({ error:'Utilisateur non trouvé' });
			}
			bcrypt.compare(req.body.password, user.password) //else comparing password to see if it matches
			.then(valid => {
				if (!valid){ //if invalid, error message
					return res.status(401).json({ error:'Mot de passe incorrect' });
				}
				res.status(200).json({ 
					userId: user._id,
					token: jwt.sign( // creating new token with user ID, token key and expiration limit
						{ userId: user._id },
						'RANDOM_TOKEN_SECRET',
						{ expiresIn: '24h'}
					)
				});
			})
			.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error })); 
};