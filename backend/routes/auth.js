const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req,res)=>{
  const user = new User({
    name:req.body.name,
    email:req.body.email,
    password: await bcrypt.hash(req.body.password,10)
  });
  await user.save();
  res.json("Registered");
});

router.post("/login", async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user) return res.status(401).json("No user");
  const ok = await bcrypt.compare(req.body.password,user.password);
  if(!ok) return res.status(401).json("Wrong password");
  const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET);
  res.json({token, user});
});

module.exports = router;
