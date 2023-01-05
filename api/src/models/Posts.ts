import { Schema, model, Types } from "mongoose";

export interface IPost extends Document {
    title: string;
    content: String;
    image: String;
    category: Types.ObjectId;
    status: String;
    tags:[string];
    source: string;
    user: Types.ObjectId;
    publisher: Types.ObjectId;
}

const postSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: Object,
        },
        category: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Posts = model<IPost>("Post", postSchema);

export default Posts;
