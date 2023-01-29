import {Schema,model,Document,Types} from 'mongoose'

export interface IPollVotes extends Document{
    _id: string,
    visitor: Types.ObjectId,
    post: Types.ObjectId
}

const pollVotesSchema: Schema = new Schema({
    poll:{
        type:Schema.Types.ObjectId,
        ref:'Poll',
        required:true

    },
    visitor:{
        type:Schema.Types.ObjectId,
        ref:'Visitor',
        required:true
    },
    option:{
        type:Schema.Types.ObjectId,
        ref:'Polls.options',
    }
},
{ timestamps: true }
)

const PollVotes = model <IPollVotes> ('PollVotes',pollVotesSchema)

export default PollVotes