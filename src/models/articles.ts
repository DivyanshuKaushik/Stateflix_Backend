import {Schema,model} from 'mongoose'
const articleSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Article = model('Article',articleSchema)

export default Article