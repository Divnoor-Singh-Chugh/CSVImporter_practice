const Employee = require("../models/Employee");
const multer=require('multer');
// const csvFilePath='/home/divnoorsc/Documents/employee_details.csv';
const csv=require('csvtojson');
const CsvParser=require('json2csv').Parser;
const createEmployee = async (req, res) => {
  try {
    const myemployee = await Employee.findOne({ email: req.body.email });
    if (myemployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }
    const employee = new Employee({ ...req.body, owner: req.manager });
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ owner: req.manager });
    console.log(employees)
    if (!employees) {
      return res.status(404).json({ message: "No User found" });
    }
    res.send(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
         cb(null,'./employee');
    },
    filename:(req,file,cb)=>{
       cb(null,file.originalname);
    }
})

var upload=multer({
    storage,
    fileFilter(req,file,cb){
        console.log("in")
        if(!file.originalname.match(/\.(csv)$/))
       {
        return cb( new Error('Please upload .csv file!...'))
       }
       cb(undefined,true);
    }
})

const csvtodatabase= async (req,res)=>{
    const jsonArray=await csv().fromFile(req.file.path);
    const employeeArray=[];
    for(var x=0;x<jsonArray.length;x++)
    {
        employeeArray.push({
            email:jsonArray[x].Email,
            role:jsonArray[x].Role,
            owner:jsonArray[x].Owner
        })
    }
    console.log(employeeArray);
    await Employee.insertMany(employeeArray);
    // console.log(jsonArray);
    // console.log(req.params.id);
    // const employee=await Employee.findOne({_id:req.params.id,owner:req.manager});
    // console.log(employee);
    // if(!employee)
    // {
    //     return res.status(404).json({message:'No employee found'});
    // }
    res.send();
};
const databasetocsv= async (req,res)=>{
try {
  let employees=[];
 const employeesData=await Employee.find({});
 employeesData.forEach((employee)=>{
  const {_id,email,role,owner}=employee;
  employees.push({_id,email,role,owner});
 }); 
 const csvFields=['Id','Email','Role','Owner'];
 const csvParser=new CsvParser({csvFields});
 const csvData=csvParser.parse(employees);
 res.setHeader("Content-Type","text/csv");
 res.setHeader("Content-Disposition","attachment; filename=employee_details.csv");
 res.end(csvData);
} catch (error) {
  res.status(400).json({message:'Unable to get data from database'})
}
};


module.exports = { createEmployee, getEmployees,csvtodatabase,databasetocsv,upload};
