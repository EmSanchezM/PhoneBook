import { DocumentDefinition, UpdateQuery } from 'mongoose'; 
import Contact, { ContactDocument } from '../models/contact.model';

export async function getContacts(){
    try {
        const contacts = await Contact.find({});
        return contacts;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getContactById(contactId: string){
    try {
        const contact = await Contact.findById(contactId);
        return contact;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createContact(input: DocumentDefinition<Omit<ContactDocument, 'createdAt' | 'updatedAt'>>){
    try {
        const contact = await Contact.create(input);
        return contact;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateContact(contactId: string, contactUpdate: UpdateQuery<ContactDocument>){
    try {
        const contact = Contact.findByIdAndUpdate(contactId, contactUpdate);
        return contact;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteContact(contactId: string){
    try {
        return Contact.findByIdAndDelete(contactId);
    } catch (error: any) {
        throw new Error(error);
    }
}