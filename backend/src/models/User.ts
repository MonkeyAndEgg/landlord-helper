import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  token: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

export const User = model<IUser>('User', userSchema);