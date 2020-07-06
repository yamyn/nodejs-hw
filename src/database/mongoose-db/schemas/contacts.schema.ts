import { Schema } from 'mongoose';

export const ContactsSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
    },
    { timestamps: true, autoIndex: true },
);
