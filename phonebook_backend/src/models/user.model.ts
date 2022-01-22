import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
    name: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{
    timestamps: true,
    versionKey: false,
});

userSchema.pre('save', async function(next){
    let user = this as UserDocument;

    if(!user.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function(canditatePassword: string): Promise<boolean>{
    const user = this as UserDocument;

    return bcrypt.compare(canditatePassword, user.password).catch(e=>false);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;