const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    mobile:{
        type: Number,
        require: true,
        unique: true
    },
    role:{
        type: Number,
        require: true,
        default: 1
    },
    password:{
        type: String,
        require: true
    }
});

userSchema.set('timestamps',true);

const userModel = mongoose.model("user",userSchema);


module.exports = userModel;