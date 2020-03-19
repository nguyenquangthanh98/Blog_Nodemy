var mongoose = require("../config/conectDB");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: String,
    password: String,
    type:{
        type: Number,
        default: 3
    }
})
var UserModel = mongoose.model("users",UserSchema);
module.exports = UserModel;