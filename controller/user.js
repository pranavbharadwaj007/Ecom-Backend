const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');
const { timeStamp } = require('console');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Plese provide a name'],
        maxlength:[40,'Name should be under 40 characters']
    },
    email:{
        type:String,
        required:[true,'Plese provide a email'],
        validate:[validator.isEmail,'Plese enter email in correct format'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Plese provide a password'],
        minlength:[6,'password should be atleast 6 char'],
        select:false
    },
    role:{
        type:String,
        default:'user'
    },
    photo:{
        id:{
            type:String,
            required:true
        },
        secure_url:{
            type:String,
            required:true
        }
    },
    forgotPasswordToken:{
        type:String,
    },
    forgotPasswordExpiry:{
        type:Date,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


});

// encrypt pass

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();
    this.password=await bcrypt.hash(this.password,10);
});

// validate password
userSchema.methods.isValidatedPassword=async function(usersendPassword){
 return await bcrypt.compare(usersendPassword,this.password);
}
//create and return jwt
userSchema.methods.getJwtToken=function(){
   return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
}

// generate forgot password token

userSchema.methods.getForgotPasswordToken=function(){
 const forgotToken=crypto.randomBytes(20).toString('hex');

 this.forgotPasswordToken=crypto.createHash('sha256').update(forgotToken).digest('hex');

 timeStamp.forgotPasswordExpiry=Date.now()+20*60*100;
 return forgotToken;
}
module.exports=mongoose.model('User',userSchema);

