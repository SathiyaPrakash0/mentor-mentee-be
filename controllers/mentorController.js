
const User = require("../models/userModel");
const Mentor = require("../models/mentorModel");

exports.mentorsAll = async (req, res, next)=>{
    try{
        const mentors = await User.find({role:2});
        res.send(mentors);
    } catch(err){
        next(err);
    }
}

exports.mentorsNew = async (req, res, next)=>{
    try{
        const mentors = await User.find({role:2}).limit(4);
        res.send(mentors);
    } catch(err){
        next(err);
    }
}

exports.mentor = async (req,res,next)=>{
    try{
        const mentorUser = await User.findById(req.body.mId);
        const mentor = await Mentor.findOne({mentor_id:req.body.mId});
        res.send({a:mentorUser,b:mentor});
    } catch(err){
        next(err);
    }
}

exports.mentorFilter = async (req, res, next)=>{
    try{
        const mentorList = await Mentor.find(req.body);
        res.send(mentorList);
    } catch(err){
        next(err);
    }
}

exports.mentorFilterExp = async (req, res, next)=>{
    try{
        const mentorList = await Mentor.find({experience:{$gte:0,$lte:req.body.end}});
        let ids = mentorList.map((data) => data.mentor_id)

        const mentorInfo = await User.find({'_id':{$in:ids}});
        res.send(mentorInfo);
    } catch(err){
        next(err);
    }
}

exports.mentorFilterGtExp = async (req, res, next)=>{
    try{
        const mentorList = await Mentor.find({experience:{$gte:req.body.end}});

        let ids = mentorList.map((data) => data.mentor_id)
        
        const mentorInfo = await User.find({'_id':{$in:ids}});
        
        res.send(mentorInfo);
    } catch(err){
        next(err);
    }
}