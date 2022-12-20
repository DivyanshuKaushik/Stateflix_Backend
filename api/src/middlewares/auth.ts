import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export interface CustomRequest extends Request {
    user?:any
}
interface JwtPayload {
    _id: string
    email: string
    role: string
    exp: number
    iat: number
}
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization
        if(!token) return res.status(401).json({message: 'No token provided'})
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload
        if(decoded.role !== "admin") return res.status(401).json({message: 'Unauthorized'})
        next()
    }catch(error){
        res.status(403).json({
            message: "Something went wrong",
            error
        })
    }
}
export const isEditor = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization
        if(!token) return res.status(401).json({message: 'No token provided'})
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload
        if(!(decoded.role === "admin" || decoded.role === "editor")) return res.status(401).json({message: 'Unauthorized'})
        next()
    }catch(error){
        res.status(403).json({
            message: "Something went wrong",
            error
        })
    }
}
export const isReporter = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization
        if(!token) return res.status(401).json({message: 'No token provided'})
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload
        if(!(decoded.role === "admin" || decoded.role === "reporter")) return res.status(401).json({message: 'Unauthorized'})
        next()
    }catch(error){
        res.status(403).json({
            message: "Something went wrong",
            error
        })
    }
}

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization
        if(!token) return res.status(401).json({message: 'No token provided'})
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload
        if(!decoded) return res.status(401).json({message: 'Unauthorized'})
        req.user = decoded
        next()
    }catch(error){
        res.status(403).json({
            message: "Something went wrong",
            error
        })
    }
}