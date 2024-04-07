require("dotenv").config();
require("./db");

const express = require("express");
const cors = require("cors");

// controller
const {signUp, signIn} = require("./controllers/authController");
const {mentorsAll, mentorsNew, mentor, mentorFilter, mentorFilterExp, mentorFilterGtExp} = require("./controllers/mentorController");

const app = express();

// middleware configurations
app.use(cors({
    origin: ["https://mentor-mentee-fe.onrender.com/"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());

// routers
app.post("/signup", signUp);
app.post("/signin", signIn);
app.get("/mentorsAll", mentorsAll);
app.get("/mentorsNew", mentorsNew);
app.post("/mentor", mentor);
app.post("/mentorFilter", mentorFilter);
app.post("/mentorFilterExp", mentorFilterExp);
app.post("/mentorFilterGtExp", mentorFilterGtExp);

// error handling configurations
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// server configuration
app.listen(process.env.PORT, ()=>{
    console.log(`Server starts on ${process.env.PORT}`);
});
