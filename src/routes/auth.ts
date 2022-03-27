import { Router,Application,Request,Response,NextFunction,ErrorRequestHandler } from 'express'
const router: Router = Router()

router.get('/users',async(req: Request,res: Response)=>{
    try{

    }catch(error){
        res.status(500).json({status:500,error})
    }
})

export default router