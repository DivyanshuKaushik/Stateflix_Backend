import { Schema, model } from "mongoose";
import { IUser } from "./users";
export interface IArticle extends Document {
    title: string;
    summary: String;
    image: String;
    date: Date;
    category: String;
    type: String;
    status: String;
    user: IUser;
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
            type: String,
            required: true,
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