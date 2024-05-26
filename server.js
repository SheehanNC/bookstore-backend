require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express()
app.use(cors());
const workouts = require("./Routes/userRoutes")
const ratings = require("./Routes/ratingRoutes")
const cartRoutes = require("./Routes/cartRoutes");
const feedbackRoutes = require("./Routes/feedbackRoutes")

app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

app.use('/api', workouts)
app.use('/api', ratings);
app.use('/api', cartRoutes);
app.use('/api', feedbackRoutes)


mongoose.connect(process.env.MONGO_URI)

.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Connected to DB, listening on port", process.env.PORT);
    })
    process.env
})
.catch((error)=>{
    console.log(error)
})
