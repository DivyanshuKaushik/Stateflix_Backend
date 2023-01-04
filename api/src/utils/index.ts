import { Response } from "express";
function JsonResponse(res:Response, status:number, message?:string, data?:any,error?:any) {
    if(data)
        return res.status(status).json({status, message, data})
    else if(error)
        return res.status(status).json({status, error})
    else
        return res.status(200).json({status, message: "Something went wrong"})
}
export function JSONResponse(statusCode:number,message:string,data:any=null){
    return {statusCode,message,data}
}
export const genAPIKey = () => {
    //create a base-36 string that contains 30 chars in a-z,0-9
    return [...Array(30)]
      .map((e) => ((Math.random() * 36) | 0).toString(36))
      .join('');
  };
export {JsonResponse}