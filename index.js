const app=require('./app');
require('dotenv').config();

const home=require("./routes/home");
app.use("/api/v1",home);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`);
})


 //(arg1, arg2)=>{

//}