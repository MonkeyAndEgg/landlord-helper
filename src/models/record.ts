import { TYPE } from "../constants/record-type";

export interface Record {
  title: string;
  category: string;
  date: Date;
  amount: string;
  type: TYPE;
}