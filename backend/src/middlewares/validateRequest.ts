import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }catch(error){
        console.error(error);
        res.status(500).json({ status: 500, error });
    }
}
export default validateRequest;