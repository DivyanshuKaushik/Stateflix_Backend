import { Schema, model, Document, Types } from "mongoose";
import jwt from "jsonwebtoken";

interface IPublisher extends Document {
    publisher: Types.ObjectId;
}
export interface IVisitor extends Document {
    _id: string;
    provider_id: string;
    provider: string;
    name: string;
    email: string;
    picture: string;
    role: string;
    following: string[];
    token: string;
    generateAuthToken: () => Promise<string>;
}

const visitorSchema: Schema = new Schema(
    {
        provider_id: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        picture: {
            type: String,
        },
        role: {
            type: String,
            default: "visitor",
        },
        token: String,
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "Publisher",
            },
        ],
    },
    { timestamps: true }
);

// generate auth token for user authentication
visitorSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign(
            { _id: this._id, email: this.email, role: this.role },
            String(process.env.JWT_SECRET),
            { expiresIn: "10d" }
        );
        return token;
    } catch (err) {
        console.error(err);
    }
};
// end generate auth token for user authentication

const Visitors = model<IVisitor>("Visitor", visitorSchema);

export default Visitors;
