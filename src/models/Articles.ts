import { Schema, model, Types } from "mongoose";

export interface IArticle extends Document {
    title: string;
    summary: String;
    image: String;
    date: Date;
    category: String;
    type: String;
    status: String;
    user: Types.ObjectId;
}

const articleSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        summary: {
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
        type: {
            type: String,
            required: true,
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

const Article = model<IArticle>("Article", articleSchema);

export default Article;
