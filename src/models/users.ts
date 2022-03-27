import {Schema,model,Document} from 'mongoose'

interface User extends Document{
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

export default model <User> ('User',userSchema)