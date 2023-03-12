import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

dotenv.config();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.set('strictQuery', true);
try {
  await mongoose.connect(process.env.DB_URL, {});
} catch(e) {
  console.log('Failed to connect db.');
}
console.log('📚 Connected to db.');

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);