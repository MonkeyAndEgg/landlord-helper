import { TYPE } from "../constants/record-type";

export interface Record {
  title: string;
  category: string;
  date: string;
  amount: string;
  type: TYPE;
}