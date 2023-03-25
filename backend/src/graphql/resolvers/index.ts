import { recordReslovers } from "./records";
import { userReslovers } from "./users";

export const resolvers = {
  Query: {
    ...userReslovers.Query,
    ...recordReslovers.Query,
  },
  Mutation: {
    ...userReslovers.Mutation,
    ...recordReslovers.Mutation,
  }
};