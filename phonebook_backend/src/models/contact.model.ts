import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface ContactDocument extends mongoose.Document {
    name: string;
    lastName: string;
    phoneNumber: string;
    user: UserDocument['_id'],
    createdAt: Date,
    updatedAt: Date
}

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true, 
    versionKey: false
});

const Contact = mongoose.model<UserDocument>('Contact', contactSchema);

export default Contact;

