const express = require('express')
const router = express.Router()
const workouts = require('../Models/usermodel')
const mongoose  = require('mongoose')
const bcrypt = require('bcrypt');


router.get("/", (req,res)=>{
    res.json({mssg: "Get all credentials"})
})

//get credentials bases on id
router.get("/:id", async(req,res)=>{
    // res.json({mssg: "Get credentials by id"})
    const {id} = req.params
    
    try{
        const credentials = await workouts.findById(id)
        res.status(200).json(credentials)
    }
    catch{

    }
})

//post credentials, signup
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await workouts.findOne({ email });
      if (existingUser) {
        res.status(400).json({ error: "User already exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await workouts.create({ email, password: hashedPassword });
        res.status(201).json({ message: "User created successfully", newUser });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  //post credentials, login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await workouts.findOne({ email });
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          res.status(200).json({ message: "Login successful" , userData: { userId: user._id, userEmail: user.email}});
        } else {
          res.status(401).json({ error: "Incorrect password" });
        }
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


//delete credentials
router.delete("/:id", async(req,res)=>{
    const{id} = req. params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid Details"})
    }

    const credentials = await workouts.findOneAndDelete({_id: id})
    res.statusCode(200).json(credentials)
})

router.patch("/:id", async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "Invalid Details"})
    }

    const credentials = await workouts.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    res.status(200).json(credentials)

})

module.exports = router;