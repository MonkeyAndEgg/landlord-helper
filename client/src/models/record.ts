import { TYPE } from "../constants/record-type";

export interface RecordInput {
  title: string;
  category: string;
  date: string;
  amount: string;
  type: TYPE;
}

export interface Record {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: string;
  type: TYPE;
}