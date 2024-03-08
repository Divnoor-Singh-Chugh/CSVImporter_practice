const Manager = require("../models/Manager");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signupManager = async (req, res) => {
  try {
    const { email, password } = req.body;
    const myManager = await Manager.findOne({ email });
    if (myManager) {
      return res.status(400).json({ message: "Manager already exists" });
    }
    const bcryptPassword = await bcrypt.hash(password, 8);
    const manager = new Manager({ email, password: bcryptPassword });
    await manager.save();
    res.status(201).send(manager);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginManager = async (req, res) => {
  try {
    const secret = process.env.SECRET;
    const { email, password } = req.body;
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    const isCorrectPassword = await bcrypt.compare(password, manager.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({_id:manager._id},secret);
    res.send({manager,token});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signupManager, loginManager };
