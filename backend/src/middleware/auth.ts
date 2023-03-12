import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

export function authMiddleWare(context) {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_KEY);
        return user;
      } catch (err) {
        throw new GraphQLError('You are not authorized to perform this action.', {
          extensions: {
            code: 'FORBIDDEN',
          },
        });
      }
    }
    throw new Error('Authentication token format is wrong, shoudld be Bearer [token]');
  }
  throw new Error('Auth header does not exist')
}