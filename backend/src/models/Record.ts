import { Schema, model, ObjectId, Types } from "mongoose";

interface IRecord {
  title: string;
  category: string;
  date: string;
  amount: string;
  type: string;
  userId: ObjectId;
}

const recordSchema = new Schema<IRecord>({
  title: { type: String },
  category: { type: String },
  date: { type: String },
  amount: { type: String },
  type: { type: String },
  userId: { type: Types.ObjectId },
});

export const Record = model<IRecord>('Record', recordSchema);