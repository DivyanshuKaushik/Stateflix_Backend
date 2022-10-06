import { Response } from "express";
function JsonResponse(res:Response, status:number, message?:string, data?:any,error?:any) {
    if(data)
        return res.status(status).json({status, message, data})
    else if(error)
        return res.status(status).json({status, error})
    else
        return res.status(200).json({status, message: "Something went wrong"})
}

export {JsonResponse}