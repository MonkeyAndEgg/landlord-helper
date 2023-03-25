import { Schema, model } from "mongoose";

interface IRecord {
  title: string;
  category: string;
  date: string;
  amount: string;
  type: string;
  userId: Schema.Types.UUID;
}

const recordSchema = new Schema<IRecord>({
  title: { type: String },
  category: { type: String },
  date: { type: String },
  amount: { type: String },
  type: { type: String },
  userId: { type: Schema.Types.UUID },
});

export const Record = model<IRecord>('Record', recordSchema);