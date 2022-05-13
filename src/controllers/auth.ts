import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Users from "../models/Users";
import {CustomRequest} from "../middlewares/auth";

/** register controller - start */
export const register = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { name, email, phone, role, password } = req.body;

        // check if user exists in database
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ status: 400, message: "User already exists" });
        }
        // register user if not exists
        const user = new Users({ name, email, phone, role, password });
        const result = await user.save();
        res.status(201).json({
            status: 201,
            message: "User registered successfully",
            result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error });
    }
}
/** register controller - end */

/** login controller - start */
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // check if user exists in database
        const existingUser = await Users.findOne({ email });
        if (!existingUser) {
            return res
                .status(400)
                .json({ status: 400, message: "User does not exist" });
        }
        // check if password is correct
        const isMatch = await existingUser.comparePassword(password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid Credentials" });
        }
        // generate auth token
        const token = await existingUser.generateAuthToken();
        res.status(200).json({
            status: 200,
            message: "User logged in successfully",
            token,
            user:existingUser
        });
    } catch (error) {
        res.status(500).json({ status: 500, error });
    }
}
/** login controller - end */
/** get authenticated user */
export const getAuthenticatedUser = async (req: CustomRequest, res: Response) => {
    try{
        // verified user from token
        const user = req.user 
        const userData = await Users.findById(user._id)
        return res.status(200).json({status: 200, message: "User found", user:userData})
    }catch (error) {
        res.status(500).json({ status: 500, error });
    }
}
/** get authenticated user - end */