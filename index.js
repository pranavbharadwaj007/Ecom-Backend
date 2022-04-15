const app=require('./app');
require('dotenv').config();



app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`);
})


 //(arg1, arg2)=>{

//}