import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Users from "../models/Users";
import {CustomRequest} from "../middlewares/auth";
import { JsonResponse } from "../utils";

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
        console.log(email,password)

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
        // send accessToken in cookies 
        // res.cookie("accessToken", token, { httpOnly: true ,expires: new Date().setDate(new Date().getDate() + 5) ,secure: true, sameSite: 'none' });
        res.status(200).json({
            status: 200,
            message: "User logged in successfully",
            data:{
                id:existingUser._id,
                name:existingUser.name,
                email:existingUser.email,
                phone:existingUser.phone,
                role:existingUser.role,
                token
            },
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
        const userData : any = await Users.findById(user._id)
        // return res.status(200).json({status: 200, message: "User found", user:userData})
        
        return JsonResponse(res, 200, "User found", {id:userData.id,name:userData.name,email:userData.email,phone:userData.phone,role:userData.role})
    }catch (error) {
        res.status(500).json({ status: 500, error });
    }
}
/** get authenticated user - end */
/** get all users */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { page, limit } = req.query;
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);

        // find all users in db
        const users = await Users.find().collation({locale:'en',strength: 2}).sort({name:1}).skip((pageNum - 1) * limitNum)
            .limit(limitNum);
        return res.status(200).json({
            status: 200,
            message: "User fetched successfully",
            data:users
        });
    } catch (error) {
        res.status(500).json({ status: 500, error });
    }
}