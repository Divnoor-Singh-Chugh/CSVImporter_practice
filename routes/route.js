const express = require("express");
const multer=require('multer');
const router = express.Router();
const {
  signupManager,
  loginManager,
} = require("../controllers/managerController");
const {
  createEmployee,
  getEmployees,
  csvtodatabase,
  databasetocsv,
  upload
} = require("../controllers/employeeController");
const JoiValidation = require("../middleware/JoiValidation");
const JwtValidation = require("../middleware/JwtValidation");
const errorMiddleware = require("../middleware/errorMiddleware");

router.post("/manager/signup", JoiValidation, signupManager);
router.post("/manager/login", JoiValidation, loginManager);
router.post("/employee/create", JwtValidation, createEmployee);
router.get("/employee", JwtValidation, getEmployees);
router.post("/employee/csv/upload",upload.single('employee'),csvtodatabase)
router.get("/employee/csv/import",databasetocsv)
module.exports = router;
