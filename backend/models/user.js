const mongoose = require('mongoose');// mongoose plugin
const uniqueValidator = require('mongoose-unique-validator');// mongoose unique plugin, see usage below

const userSchema = mongoose.Schema({
	email: {type: String, required: true, unique: true},//user can't create two accounts with the same email adress
	password: {type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);