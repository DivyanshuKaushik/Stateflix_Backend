import { Request, Response,Express } from "express";
import Polls from "../models/Polls";
import { JSONResponse } from "../utils";
import { deleteImage, uploadImage } from "../utils/s3";
const generateOptionId = ()=>{
    let date = new Date().toLocaleDateString().split('/').reverse().join("")
    let time = new Date().toTimeString().split(' ')[0].split(':').join('')
    return date.concat(time)
}
export const getPolls = async (req: Request, res: Response) => {
    try {
        let { publisher, page, limit } = req.query;
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);

        let data=null;
        // publishers = String(publishers).split(",");
        if(publisher){
            data = await Polls.find({publisher}).sort({ 'updatedAt': -1 })
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum).populate("publisher");;
        }else{
            data = await Polls.find().sort({ 'updatedAt': -1 })
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum).populate("publisher");;
        }
        return res.status(200).json(JSONResponse(200,"Polls fetched successfully",data));
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
}

export const getPoll = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poll = await Polls.findById(id);
        res.status(200).json(poll);
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
}

export const createPoll = async (req: Request, res: Response) => {
    try {
        const { title,expiryInDays,publisher,optionsCount } = req.body;
        if(!(title && expiryInDays && publisher)){
            return res.status(400).json(JSONResponse(400,"Error: Please enter all fields"));
        }
        const options = await Promise.all(Array.from(Array(parseInt(optionsCount)).keys()).map(async (item)=>{
            const file = (req.files as Express.Multer.File[]).find((file)=>file.fieldname==`options-${item}-image`)
            if(file){
                const img_key = `polls/${generateOptionId()}-${item}`
                const img_url = await uploadImage(file.buffer,img_key)
                return {
                    name:req.body[`options-${item}-name`],
                    image:img_url
                }
            }
            return {
                name:req.body[`options-${item}-name`],
                image:""
            }
        }))

        const newPoll = new Polls({title, options,expiryInDays,publisher });
        await newPoll.save();
        res.status(201).json(JSONResponse(201,"Polls created successfully"));
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
}

export const updatePoll = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, options,expiryInDays,publisher } = req.body;
    if(!(title && options && expiryInDays && publisher)){
        return res.status(400).json(JSONResponse(400,"Error: Please enter all fields"));
    }
    try {
        const updatedPoll = await Polls.findByIdAndUpdate
        (id,{title, options,expiryInDays,publisher });
        res.status(200).json(JSONResponse(200,"Polls updated successfully",updatedPoll));
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
}
export const deletePoll = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poll = await Polls.findById(id);
        if(poll){
            await Promise.all(poll.options?.map(async (option)=>{
                if(option.image){
                    const key = option.image.split('.com/')[1]
                    await deleteImage(key)
                }
                return
            }))

        }
        await Polls.findByIdAndDelete(id);
        return res.status(200).json(JSONResponse(200,"Polls deleted successfully"));
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
}
