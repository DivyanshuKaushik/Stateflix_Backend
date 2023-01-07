import { Request, Response } from "express";
import createHttpError from 'http-errors'
import Trending from "../models/Trending.model";
import { JSONResponse } from "../utils";

// create trending tag 
export const createTrendingTag = async(req:Request,res:Response)=>{
    try {
        const {tag} = req.body;
        if(!tag){
            return res.status(400).json({status:400,message:"tag is required"})
        }
        const newTrendingTag = new Trending({tag});
        await newTrendingTag.save();

        return res.status(201).json(JSONResponse(201,"Trending tag created successfully",newTrendingTag))
        
    } catch (error) {
        return new createHttpError.InternalServerError();
    }
}

// get all trending tags
export const getAllTrendingTags = async(req:Request,res:Response)=>{
    try {
        const trendingTags = await Trending.find();
        return res.status(200).json(JSONResponse(200,"Trending tags fetched successfully",trendingTags))
    } catch (error) {
        return new createHttpError.InternalServerError();
    }
}

// delete trending tag 
export const deleteTrendingTag = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const deletedTag = await Trending.findByIdAndDelete(id);
        return res.status(202).json(JSONResponse(202,"Trending tag deleted successfully",deletedTag))
    } catch (error) {
        return new createHttpError.InternalServerError();
    }
}