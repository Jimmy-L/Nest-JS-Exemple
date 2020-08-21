import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    lastName: String,
    firstName: String,
    phone: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
});