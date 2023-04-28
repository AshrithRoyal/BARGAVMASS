const mongoose = require('mongoose')

const {Schema} = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    }
},{timestamps:true},);

module.exports = mongoose.model("User", UserSchema)