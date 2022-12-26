import { Schema, model } from "mongoose";

interface IPublisher extends Document {
    name: string;
    image: string;
}

const PublisherSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
}, { timestamps: true });

const Publisher = model<IPublisher>("Publisher", PublisherSchema);

export default Publisher;
