import {connect} from 'mongoose'
import { config } from 'dotenv'
config()
const uri : string = process.env.MONGO_URI as string
export default ()=>{
    connect(uri).then(()=>console.log('DB Connected!')).catch((err)=>console.log(err))
}