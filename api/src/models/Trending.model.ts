import { Schema, model } from "mongoose";

interface ITrending extends Document {
    tag:String;
}

const TrendingSchema : Schema = new Schema({
    tag:{
        type:String,
        required:true
    },
}, { timestamps: true })

const Trending = model<ITrending>("Trending",TrendingSchema);

export default Trending;