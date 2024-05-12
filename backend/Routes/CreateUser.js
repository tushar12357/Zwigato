const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const crypto = require('crypto');

const generateJWTSecret = () => {
  return crypto.randomBytes(32).toString('hex'); 
};

const jwtSecret = generateJWTSecret();

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 8 }),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt= await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt)

    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secPassword,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [body("email").isEmail(), body("password").isLength({ min: 8 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userdata = await User.findOne({
        email: req.body.email,
      });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Account doesn't exist. Please Signup" });
      }
      const pwdCompare=await bcrypt.compare(req.body.password,userdata.password)
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Incorrect Password" });
      }
      const data={
        user:{
          id:userdata.id
        }
      }
      const authToken=jwt.sign(data,jwtSecret);
      return res.json({ success: true ,authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
