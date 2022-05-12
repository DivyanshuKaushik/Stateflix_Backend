import { Schema, model } from "mongoose";

interface ICategory extends Document {
    name:String;
    hindiName:String;
}

const categorySchema : Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    hindiName:{
        type:String,
        required:true
    }
})

const Category = model<ICategory>("Category",categorySchema);

export default Category;