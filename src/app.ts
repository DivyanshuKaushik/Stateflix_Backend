import express,{ Application,Request,Response,NextFunction,ErrorRequestHandler } from 'express'
import { Server } from 'http'
import createHttpError from 'http-errors'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'

// express app initialization
const app: Application = express()

// request logger 
app.use(morgan('short'))
// http headers for app security 
app.use(helmet());

// cors configuration 
const corsOptions = {
    origin:['https://stateflix.in','https://stateflix.com'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
// cors config end 

// dotenv config 
dotenv.config()

// all routes - start
app.get('/',async(req: Request,res: Response)=>{
    res.status(200).send({message:"Welcome to StateFlix"})
})
// all routes - end

// error handling - start
app.use((req: Request,res: Response,next: NextFunction)=>{
    next(new createHttpError.NotFound())
})
const errorHandler: ErrorRequestHandler = (err,req,res,next)=>{
    res.status(err.status || 500).send({
        status: err.status || 500,
        message: err.message
    })
}
app.use(errorHandler)
// error handling - end

// start server 
const PORT: Number = Number(process.env.PORT) || 4000

const server: Server = app.listen(PORT,()=>console.log(`server up at port ${PORT}`))

export default app