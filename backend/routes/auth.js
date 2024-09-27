const express = require("express");
const User = require("../models/User");
var bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const router = express.Router();
var jwt = require("jsonwebtoken");
const SECRET_TOKEN = "saraisagoodgirl";
const fetchUser = require("../middleware/FetchUser");
//create a user
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
      let success=false;
      return res.status(400).json({ success:false,result: result.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      let success=false;
      return res.status(400).json({ success:false,error: "Email already exists" });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, SECRET_TOKEN);
      let success=true
      res.json({ authtoken,success });
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Bad request found");
    }
  }
);
//login user
router.post(
  "/userLogin",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //res.json({amma:"amma"})
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
      }

      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        let success = false;
        return res
          .status(500)
          .json({ success:false, error: "Please sign in with the right credentials" });
      }
      const passcompare = await bcrypt.compare(password, user.password);
      if (!passcompare) {
        let success = false;
        return res
          .status(500)
          .json({ success:false,error: "Please sign in with the right credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, SECRET_TOKEN);
      let success = true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Bad request found");
    }
  }
);
//get user
router.post("/getUser", fetchUser, async (req, res) => {
  // res.json({ amma: "amma" });
  try {
    const userId = req.user.id;
    // Debug: Log userId and its type
    console.log("userId:", userId);
    console.log("Type of userId:", typeof userId);
    const user = await User.findById(userId).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.status(401).json("User not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Bad request found");
  }
});
module.exports = router;
