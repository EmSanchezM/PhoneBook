import { omit } from 'lodash';
import { DocumentDefinition, UpdateQuery } from 'mongoose'; 
import User, { UserDocument } from '../models/user.model';

export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>){
    try {
        const user = await User.create(input);
        return omit(user.toJSON(), 'password');
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function validatePassword({
    email,
    password,
}: {
    email: string,
    password: string
}){
    const user = await User.findOne({ email });

    if(!user){
        return false;
    }

    const isValid = await user.comparePassword(password);

    if(!isValid) return false;

    return omit(user.toJSON(), 'password');
}

export async function updateUser(userId: string, userUpdate: UpdateQuery<UserDocument>){
    try {
        const user = User.findByIdAndUpdate(userId, userUpdate);
        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteUser(userId: string){
    try {
        return User.findByIdAndDelete(userId);
    } catch (error: any) {
        throw new Error(error);
    }
}