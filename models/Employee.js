const mongoose=require('mongoose');
const employeeSchema=mongoose.Schema({
      email: {
        type: String,
        unique:true,
        required:true,
      },
      role: {
        type: String,
        default:'developer'
      },
      owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Manager',
        required:true,
      }   
},{
    timestamps:true
});

const Employee=mongoose.model('Employee',employeeSchema);

module.exports=Employee;