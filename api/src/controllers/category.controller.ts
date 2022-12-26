import { Request, Response } from "express";
import Category from "../models/Category";
import { uploadImage } from "../utils/s3";
/** create category controller */
export const createCategory = async(req:Request,res:Response)=>{
    try{
        // check if image exists
        if (!req.file) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Please upload an image" }] });
        }
        const {name,hindiName} = req.body;
        console.log(name,hindiName);
        if(!name || !hindiName){
            return res.status(400).json({errors:[{msg:"Please enter all fields"}]});
        }
        const findCategory = await Category.findOne({name});
        if(findCategory){
            return res.status(400).json({errors:[{msg:"Category already exists"}]});
        }
        const category = new Category({
            name,
            hindiName
        });
        const saved = await category.save();
         // upload image to s3
        // image is as req.file - img_name is as folder/postID.webp
        const img_name = `categories/${saved._id}`;
        const img_url = await uploadImage(
            req.file?.buffer as Buffer,
            img_name as string
        );
        await Category.findByIdAndUpdate(saved._id, { image: img_url });
        // send response back
        return res.status(201).json({
            status: 201,
            message:"Category created successfully",
            data: { category: saved, image: img_url },
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
}
/** create category controller -end*/

/** get all category */
export const getCategories = async(req:Request,res:Response)=>{
    try{
        const categories = await Category.find({});
        return res.status(200).json({
            status:200,
            message:"Categories fetched successfully",
            data:categories
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
}
/** get all category - end */

/** delete category */
export const deleteCategory = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        return res.status(200).json({
            status:200,
            message:"Category deleted successfully",
            data:category
        });
    }catch(error){  
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
}
/** delete category - end */