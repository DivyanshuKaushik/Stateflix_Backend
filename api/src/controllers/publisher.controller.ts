import { Request, Response } from "express";
import Publisher from "../models/Publisher";
import { JSONResponse } from "../utils";

export const getPublishers = async (req: Request, res: Response) => {
    try {
        const publishers = await Publisher.find();
        return res
            .status(200)
            .json(
                JSONResponse(200, "Publishers fetched successfully", publishers)
            );
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
};

export const getPublisher = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const publisher = await Publisher.findById(id);
        res.status(200).json(publisher);
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
};

export const createPublisher = async (req: Request, res: Response) => {
    const { name, image } = req.body;
    if (!(name)) {
        return res
            .status(400)
            .json(JSONResponse(400, "Error: Please enter all fields"));
    }
    try {
        const newPublisher = new Publisher({ name, image });
        await newPublisher.save();
        res.status(201).json(
            JSONResponse(201, "Publisher created successfully", newPublisher)
        );
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
};

export const updatePublisher = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, image } = req.body;
    if (!(name && image)) {
        return res
            .status(400)
            .json(JSONResponse(400, "Error: Please enter all fields"));
    }
    try {
        const updatedPublisher = await Publisher.findByIdAndUpdate(id, {
            name,
            image,
        });
        res.status(200).json(
            JSONResponse(
                200,
                "Publisher updated successfully",
                updatedPublisher
            )
        );
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
};

export const deletePublisher = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Publisher.findByIdAndDelete(id);
        res.status(200).json(JSONResponse(200, "Publisher deleted successfully"));
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
}