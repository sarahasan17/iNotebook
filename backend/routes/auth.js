const express = require("express");
const User = require("../models/User");
var bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const router = express.Router();
var jwt = require("jsonwebtoken");
const SECRET_TOKEN='saraisagoodgirl';
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    //res.json({amma:"amma"})
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    }
     let user = await User.findOne({ email: req.body.email });
     if (user) {
       return res.status(400).json({ error: "Email already exists" });
     }
    try{
      const salt=await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt)
      user=await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,SECRET_TOKEN)
    res.json({authtoken})
    }
    catch(error){
      console.error(error.message)
      res.status(500).json("Bad request found")

    }
  }
);

module.exports = router
