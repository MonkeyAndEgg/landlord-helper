import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

dotenv.config();

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

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);