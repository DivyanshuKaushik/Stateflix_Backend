import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {v2 as cloudinary} from 'cloudinary';
import Article from "../models/Articles";

/** create new post controller - start  */
export const createPost = async (req: Request, res: Response) => {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        // }
        const {title,summary,date,category,type,status,user} = req.body;

        return res.status(201).json({status:201,message:"Article created successfully"})
    //     console.log(req.body,req.file);
    //    res.json({...req.body,file:req.file})
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error });
    }
}
/** create new post controller - end  */