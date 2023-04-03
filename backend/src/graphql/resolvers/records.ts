import { Record } from "../../models/Record";
import { GraphQLError } from "graphql";

export const recordReslovers = {
  Query: {
    records: async (_, { getRecordsInput: { userId, year } }) => await Record.find({ userId, date: {
      $gte: `${year}-01-01`,
      $lte: `${year}-12-31`
    } }).sort('date')
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
    },

    // async updateRecord

    async deleteRecord(_, { recordId }) {
      const res = await Record.deleteOne({ _id: recordId });
      if (res.deletedCount === 0) {
        throw new GraphQLError(`Failed to delete the record.`)
      }
      return res;
    }
  }
};