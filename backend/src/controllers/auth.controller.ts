import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Users from "../models/Users";
import { CustomRequest } from "../middlewares/auth";
import { JsonResponse,JSONResponse } from "../utils";
import { getCache, setCache } from "../cache";

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
};
/** register controller - end */

/** login controller - start */
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

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
        res.cookie("accessToken", token, {expires: new Date(new Date().getTime()+ 1000 * 60 * 60 * 24 * 10)});
        // res.cookie("accessToken", token, { httpOnly: true ,expires: new Date(new Date().getTime()+ 1000 * 60 * 60 * 24 * 10) ,secure: false, sameSite: 'none' });
        return res
            .status(200)
            .json({
                status: 200,
                message: "User logged in successfully",
                data: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    phone: existingUser.phone,
                    role: existingUser.role,
                    token,
                },
            });
    } catch (error) {
        res.status(500).json({ status: 500, error });
    }
};
/** login controller - end */
/** get authenticated user */
export const getAuthenticatedUser = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        // verified user from token
        const user = req.user;
        // fetch from cache 
        const cacheUser = await getCache(`user-${user._id}`)
        if(cacheUser){
            return res.status(200).json(JSONResponse(200,"From cache",JSON.parse(cacheUser as string)))
        }

        const userData: any = await Users.findById(user._id);
        // return res.status(200).json({status: 200, message: "User found", user:userData})

        await setCache(`user-${user._id}`,JSON.stringify(userData))
        return JsonResponse(res, 200, "User found", {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            role: userData.role,
        });
    } catch (error) {
        res.status(500).json({ status: 500, error });
    }
};
/** get authenticated user - end */
/** get  */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { page, limit } = req.query;
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);

        // find all users in db
        const users = await Users.find()
            .collation({ locale: "en", strength: 2 })
            .sort({ name: 1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);
        return res.status(200).json({
            status: 200,
            message: "User fetched successfully",
            data: users,
        });
    } catch (error) {
        res.status(500).json({ status: 500, error });
    }
};
/** get all user end */

/** get all users */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // find all users in db
        await Users.findByIdAndDelete(id);
        return res.status(202).json({
            status: 202,
            message: "User deleted successfully",
            data: null,
        });
    } catch (error) {
        res.status(500).json({ status: 500, error });
    }
};
/** get all user end */

/** updated password*/
export const changePassword = async (req: CustomRequest, res: Response) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await Users.findById(req.user._id);
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User not found",
                data: null,
            });
        }
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid Credentials" });
        }
        user.password = newPassword;
        await user.save();
        return res.status(202).json({
            status: 202,
            message: "Password updated successfully",
            data: null,
        });
    } catch (error) {
        res.status(500).json({ status: 500, error });
    }
};
/** updated password - end */
