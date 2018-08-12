var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var usersSchema = new Schema({
    id: ObjectId,
    name: String,
    email: String
});

module.exports = mongoose.model('Users', usersSchema);