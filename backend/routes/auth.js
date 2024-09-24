const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    }
     let user = await User.findOne({ email: req.body.email });
     if (user) {
       return res.status(400).json({ error: "Email already exists" });
     }
    try{
      user=await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
      // .then((user) => res.json(user))
      // .catch((err) => {
      //   console.log(err);
      //   res.json({
      //     error: "please enter a unique value",
      //     message: err.message,
      //   });
      // });
      res.json(user)
    }
    catch(error){
      console.error(error.message)
      res.status(500).json("Bad request found")

    }
  }
);

module.exports = router
