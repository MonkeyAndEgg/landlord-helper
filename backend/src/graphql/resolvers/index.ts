import { userReslovers } from "./users";

export const resolvers = {
  Query: {
    ...userReslovers.Query
  },
  Mutation: {
    ...userReslovers.Mutation
  }
};