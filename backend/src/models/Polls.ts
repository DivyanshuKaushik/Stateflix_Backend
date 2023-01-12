import { Schema, model,Types } from "mongoose";

interface IOption {
    name: string;
    image: string;
}
interface IPoll extends Document {
    title: string;
    options: IOption[];
    expiryInDays: number;
    publisher:Types.ObjectId;
}

const PollSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    options: [
        {
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
            },
        },
    ],
    expiryInDays: {
        type: Number,
        required: true,
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: "Publisher",
    },
}, { timestamps: true });

const Poll = model<IPoll>("Poll", PollSchema);

export default Poll;
