import { Request, Response } from "express";
import { Types } from "mongoose";
import { CustomRequest } from "../middlewares/auth";
import Publisher from "../models/Publisher";
import Visitors from "../models/Visitor";
import { JSONResponse } from "../utils";

export const followPublisher = async (req: CustomRequest, res: Response) => {
    try {
        const publisher = req.params.id;
        const visitor = await Visitors.findById(req.user._id);
        if (visitor) {
            visitor.following.push(publisher);
            await visitor.save();
        }else{
            return res.status(400).json(JSONResponse(400, "Error: Visitor not found"));
        }
        return res
            .status(200)
            .json(
                JSONResponse(200, "Followed successfully")
            );
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
};

export const getFollowing = async (req: CustomRequest, res: Response) => {
    try {
        const visitor = await Visitors.findById(req.user._id).populate("following");
        if (visitor) {
            return res
            .status(200)
            .json(
                JSONResponse(200, "followers fetched successfully", visitor.following)
            );
        }else{
            return res.status(400).json(JSONResponse(400, "Error: Visitor not found"));
        }
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
};