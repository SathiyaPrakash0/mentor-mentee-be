const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.signUp = async (req, res, next)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if (user){
            return next(new createError(400, 'Email already exists'));
        }
        const hashPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            ...req.body,
            password: hashPassword
        });

        //JWT token generation
        const token = jwt.sign({_id:newUser._id}, "secretkey123", {expiresIn: '30d'});

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            token,
            user:{
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role
            }
        });
    } catch(err){
        next(err);
    }
};

exports.signIn = async (req, res, next)=>{
    try{
        const {email, password} = req.body;
        // check wheather the user is available
        const user = await User.findOne({email});
        if(!user) return next(new createError(404, "User not found"));
        // chack wheather the password is matched
        const isPasswordvalid = await bcrypt.compare(password, user.password);
        if(!isPasswordvalid) return next(new createError(401, "Invalid Password"));
        //JWT token generation
        const token = jwt.sign({_id:user._id}, "secretkey123", {expiresIn: '30d'});
        res.status(200).json({
            status: 'success',
            message: 'Sign In successfully',
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    } catch(err){
        next(err);
    }
};