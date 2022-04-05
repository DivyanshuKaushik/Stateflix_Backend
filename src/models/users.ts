import {Schema,model,Document} from 'mongoose'
import { Request,Response,NextFunction,ErrorRequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export interface IUser extends Document{
    name:String,
    email:String,
    phone:String,
    role:String,
    password:String,
}

const userSchema: Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{ timestamps: true }
)

// middleware to hash the password before saving to database using bcryptjs
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
    }
    next();
})
// end hashing password middleware 

// generate auth token for user authentication
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id,email:this.email,role:this.role},String(process.env.JWT_SECRET));
        return token;
    }
    catch(err){
        console.log(err)
        // res.status(400).send(err)
    }
}
// end generate auth token for user authentication

const Users = model <IUser> ('User',userSchema)

export default Users