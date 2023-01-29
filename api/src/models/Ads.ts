import { Schema, model } from "mongoose";

interface IAds extends Document {
    name:String;
    image:String;
    type:String;
}

const adsSchema : Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }
}, { timestamps: true })

const Ads = model<IAds>("Ads",adsSchema);

export default Ads;