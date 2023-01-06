import { Request, Response } from "express";
import Ads from "../models/Ads";
import { deleteImage, uploadImage } from "../utils/s3";
/** create Ads controller */
export const createAds = async(req:Request,res:Response)=>{
    try{
        // check if image exists
        if (!req.file) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Please upload an image" }] });
        }
        const {name,type} = req.body;
        if(!(name && type)){
            return res.status(400).json({errors:[{msg:"Please enter all fields"}]});
        }
        const ads = new Ads({
            name:name.toLowerCase().split(" ").join("-"),
            type
        });
        const saved = await ads.save();
         // upload image to s3
        // image is as req.file - img_name is as folder/postID.webp
        const img_name = `ads/${saved._id}`;
        const img_url = await uploadImage(
            req.file?.buffer as Buffer,
            img_name as string
        );
        await Ads.findByIdAndUpdate(saved._id, { image: img_url });
        // send response back
        return res.status(201).json({
            status: 201,
            message:"Ads created successfully",
            data: { Ads: saved, image: img_url },
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
}
/** create Ads controller -end*/

/** get all Ads */
export const getAds = async(req:Request,res:Response)=>{
    try{
        if (req.query.types) {
            const types = (req.query.type as string).split(",");
            const ads = await Ads.find({ type: { $in: types } });
            return res.status(200).json({
                status: 200,
                message: "Ads fetched successfully",
                data: ads,
            });
        }
        const ads = await Ads.find({});
        return res.status(200).json({
            status:200,
            message:"Ads fetched successfully",
            data:ads
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
}
/** get all Ads - end */

/** delete Ads */
export const deleteAds = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params;

        // delete Posts image from s3
        const img_key = "ads/" + id + ".webp";
        await deleteImage(img_key);

        await Ads.findByIdAndDelete(id);
        return res.status(200).json({
            status:200,
            message:"Ads deleted successfully",
            data:null
        });
    }catch(error){  
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
}
/** delete Ads - end */