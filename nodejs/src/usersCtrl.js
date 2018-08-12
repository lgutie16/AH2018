import { Router } from 'express';
import Users from '../models/users.js';
import knex from 'knex';


exports.create = function(req, res) {
	console.log(req.body)
    new Users({name: req.body.name, email: req.body.email}).save();
}

exports.list = function(req, res) {
	Users.find(function(err, users) {
		res.send(users);
	});
}

