import { Request, Response } from "express";
import Category from "../models/Category";
/** create category controller */
export const createCategory = async(req:Request,res:Response)=>{
    try{
        const {name,hindiName} = req.body;
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
        return res.status(201).json({
            status:201,
            message:"Category created successfully",
            data:saved
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