import express,{ Application,Request,Response,NextFunction,ErrorRequestHandler } from 'express'
import { Server } from 'http'
import createHttpError from 'http-errors'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session';
import passport from 'passport'
import MongoDBStore from 'connect-mongodb-session'
import redis from 'redis'
import db from './db'
/**  import all routes */ 
import authRoutes from './routes/auth.routes'
import postRoutes from './routes/posts.routes'
import categoryRoutes from './routes/category.routes'
import pollRoutes from './routes/polls.routes'
import publisherRoutes from './routes/publisher.routes'
import adsRoutes from './routes/ads.routes'
import trendingRoutes from './routes/trending.routes'
import visitorRoutes from './routes/visitor.routes'
import { connectToRedis } from './cache'
// import { genAPIKey } from './utils'

/**  express app initialization */
const app: Application = express()

/**  dotenv config - loading env secrets */
dotenv.config()

/** connect to redis for caching  */ 
connectToRedis()

/**  database connection */
db()

/**  request logger */ 
app.use(morgan('short'))
/**  http headers for app security */ 
app.use(helmet());


/**  bodyParser configuration */
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// parse cookies 
app.use(cookieParser())

/**  cors configuration  */
const corsOptions = {
    origin:["http://localhost:3000","https://www.stateflix.com","https://stateflix.com"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials:true,
}
app.use(cors(corsOptions))
/**  cors config end */ 

/** default headers */

// app.use((req: Request,res: Response,next: NextFunction)=>{
//     // console.log(req.cookies,req.session)
//     // res.setHeader('Access-Control-Allow-Origin','*')
//     // res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
//     // res.setHeader('Access-Control-Allow-Headers','Set-Cookie,Content-Type,Authorization,Accept-Encoding,accecpt,origin, x-requested-with, access-control-allow-credentials, cookie, access-control-allow-origin')
//     // res.setHeader('Access-Control-Allow-Credentials', 'true')
//     // res.cookie("hello","world")
//     next()
// })

/**  passport google auth setup */
const mongoStore = MongoDBStore(session);

const store = new mongoStore({
  collection: "userSessions",
  uri: process.env.MONGO_URI as string,
  expires: 1000 * 60 * 60 * 24 * 7,
});
app.use(
  session({
    secret: "googleAuth",
    saveUninitialized: false,
    resave: false,
    store,
    cookie: {
    //     httpOnly: true,
    //   sameSite: "none",
    //   secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
}))
app.set("trust proxy", 1);
app.enable("trust proxy");
app.use(passport.initialize());
app.use(passport.session());
/**  passport google auth setup end */

// generate api key 
// console.log(genAPIKey())
// auth routes without api key
app.use('/api/v1',authRoutes)
// check if api key exists
app.use((req: Request,res: Response,next: NextFunction)=>{
    try {
        const apiKey = req.headers['x-api-key']
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

// need api key to visit this routes 
app.use('/api/v1',postRoutes)
app.use('/api/v1',categoryRoutes)
app.use('/api/v1',pollRoutes)
app.use('/api/v1',publisherRoutes)
app.use('/api/v1',adsRoutes)
app.use('/api/v1',trendingRoutes)
app.use('/api/v1/visitor',visitorRoutes)
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