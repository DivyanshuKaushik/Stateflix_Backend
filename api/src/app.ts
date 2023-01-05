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
import authRoutes from './routes/auth.routes'
import postRoutes from './routes/posts.routes'
import categoryRoutes from './routes/category.routes'
import pollRoutes from './routes/polls.routes'
import publisherRoutes from './routes/publisher.routes'
import { genAPIKey } from './utils'

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
    origin:"*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
/**  cors config end */ 

/**  dotenv config - loading env secrets */
dotenv.config()

/**  database connection */
db()

// generate api key 
// console.log(genAPIKey())

// check if api key exists
app.use((req: Request,res: Response,next: NextFunction)=>{
    try {
        const apiKey = req.headers['x-api-key']
        // console.log(req.headers)
        req.headers["Accept-Encoding"] = "gzip,deflate,compress"
        if(apiKey === process.env.STATEFLIX_API_KEY){
            next()
        }else{
            next(new createHttpError.Unauthorized())
        }
        
    } catch (error) {
        next(new createHttpError.Unauthorized())
    }
})

/**** all routes - start *****/
app.get('/',async(req: Request,res: Response)=>{
    res.status(200).send({message:"Welcome to StateFlix API Service!!"})
})

app.use('/api/v1',authRoutes)
app.use('/api/v1',postRoutes)
app.use('/api/v1',categoryRoutes)
app.use('/api/v1',pollRoutes)
app.use('/api/v1',publisherRoutes)
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