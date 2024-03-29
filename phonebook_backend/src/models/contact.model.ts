import mongoose from 'mongoose';

export interface ContactDocument extends mongoose.Document {
    name: string;
    lastName: string;
    phoneNumber: string;
    createdAt: Date,
    updatedAt: Date
}

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true }
},{
    timestamps: true, 
    versionKey: false
});

const Contact = mongoose.model<ContactDocument>('Contact', contactSchema);

export default Contact;

