import { Schema, model, Types } from "mongoose";

export interface IPost extends Document {
    title: string;
    summary: String;
    image: String;
    author: String;
    date: Date;
    category: String;
    breaking: String;
    status: String;
    user: Types.ObjectId;
}

const postSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        image: {
            type: Object,
        },
        date: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        breaking: {
            type: Boolean,
            default:false,
        },
        status: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Posts = model<IPost>("Post", postSchema);

export default Posts;
