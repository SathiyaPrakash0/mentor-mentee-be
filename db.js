const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("DB connection successful"))
.catch((err)=>console.error("DB connection failed"));