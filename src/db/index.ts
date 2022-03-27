import {connect} from 'mongoose'
import { config } from 'dotenv'
config()
const uri : string = String(process.env.MONGO_URI)
export default ()=>{
    connect(uri).then(()=>console.log('DB Connected!')).catch((err)=>console.log(err))
}