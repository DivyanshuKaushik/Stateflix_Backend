import { Request, Response } from "express";
import Polls from "../models/Polls";
import { JSONResponse } from "../utils";

export const getPolls = async (req: Request, res: Response) => {
    try {
        let data=null;
        // let {publishers} = req.query;
        // publishers = String(publishers).split(",");
        // if(publishers){
        //     data = await Polls.find({publisher:{$in:publishers}}).sort({ updatedAt: -1 });

        // }else{
        //     data = await Polls.find().sort({ updatedAt: -1 });
        // }
            data = await Polls.find().sort({ updatedAt: -1 }).populate('publisher');
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
    const { title, options,expiryInDays,publisher } = req.body;
    if(!(title && options && expiryInDays && publisher)){
        return res.status(400).json(JSONResponse(400,"Error: Please enter all fields"));
    }
    try {
        const newPoll = new Polls({title, options,expiryInDays,publisher });
        await newPoll.save();
        res.status(201).json(JSONResponse(201,"Polls created successfully",newPoll));
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
        await Polls.findByIdAndDelete(id);
        res.status(200).json(JSONResponse(200,"Polls deleted successfully"));
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
}
