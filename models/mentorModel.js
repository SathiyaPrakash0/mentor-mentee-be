const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
    mentor_id:{
        type: String,
        require: true,
    },
    expertAt:{
        type: Array,
        require: true
    },
    job:{
        type: String,
        require:true,
        default:"others"
    },
    experience:{
        type: Number,
        require: true
    },
    description:{
        type: String,
        require: true
    }
});

const mentorModel = mongoose.model("mentor",mentorSchema);


module.exports = mentorModel;