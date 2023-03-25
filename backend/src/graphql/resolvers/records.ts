import { Record } from "../../models/Record";

export const recordReslovers = {
  Query: {
    records: async (_, { userId }) => await Record.find({ userId })
  },
  Mutation: {
    async addRecord(_, { addRecordInput: { title, category, date, amount, type, userId } }) {
      const record = new Record({
        title,
        category,
        date,
        amount,
        type,
        userId
      });

      const res = await record.save();

      return {
        id: res.id,
        title: res.title,
        category: res.category,
        date: res.date,
        amount: res.amount,
        type: res.type,
        userId: res.userId
      };
    }

    // async updateRecord

    // async removeRecord
  }
};