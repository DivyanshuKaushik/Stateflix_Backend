import {Schema,model,Document,Types} from 'mongoose'

export interface IBookmark extends Document{
    _id: string,
    visitor: Types.ObjectId,
    post: Types.ObjectId
}

const bookmarkSchema: Schema = new Schema({
    visitor:{
        type:Schema.Types.ObjectId,
        ref:'Visitor'
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }
},
{ timestamps: true }
)

const Bookmarks = model <IBookmark> ('Bookmark',bookmarkSchema)

export default Bookmarks