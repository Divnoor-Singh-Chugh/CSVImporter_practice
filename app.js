const express=require('express');
const app=express();
require('dotenv').config()
require('./config/mongoose');
const route=require('./routes/route');
const port=process.env.PORT

app.use(express.json());
app.use('/',route);


app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}`);
})