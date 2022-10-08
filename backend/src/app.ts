import express,{ Application,Request,Response,NextFunction,ErrorRequestHandler } from 'express'
import { Server } from 'http'
import createHttpError from 'http-errors'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import db from './db'

/**  import all routes */ 
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'
import categoryRoutes from './routes/category'

/**  express app initialization */
const app: Application = express()

/**  request logger */ 
app.use(morgan('short'))
/**  http headers for app security */ 
app.use(helmet());

/**  bodyParser configuration */
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

/**  cors configuration  */
const corsOptions = {
    origin:['https://stateflix.in','https://stateflix.com',"http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
/**  cors config end */ 

/**  dotenv config - loading env secrets */
dotenv.config()

/**  database connection */
// db()

/**** all routes - start *****/
app.get('/',async(req: Request,res: Response)=>{
    res.status(200).send({message:"Welcome to StateFlix API Service!!"})
})

app.use('/api/v1',authRoutes)
app.use('/api/v1',postRoutes)
app.use('/api/v1',categoryRoutes)
/**** all routes - end *****/

/**  error handling - start */
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
/** error handling - end */

/**  start server */
const PORT: Number = Number(process.env.PORT) || 4000

app.listen(PORT,()=>console.log(`server up at port ${PORT}`)) as Server

export default app