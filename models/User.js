const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		index: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{
			id: this._id,
			name: this.name,
			role: this.role,
			email: this.email
		},
		process.env.secret
	);
	return token;
};

const User = (module.exports = mongoose.model("User", UserSchema));
