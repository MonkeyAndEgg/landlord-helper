import { GraphQLError } from "graphql";
import { User } from "../../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userReslovers = {
  Query: {
    user: async (_, { ID }) => await User.findById(ID)
  },
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      // check if old user exists
      const currentUser = await User.findOne({ email });
      if (currentUser) {
        throw new GraphQLError(`The user with email ${email} already exists.`)
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // build out mongoose model
      const user = new User({
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      // create the JWT
      const token = jwt.sign(
        {
          user_id: user._id,
          email
        },
        process.env.JWT_KEY,
        {
          expiresIn: '2h'
        }
      );
      user.token = token;

      // Save the user to db
      const res = await user.save();

      return {
        id: res.id,
        username: res.username,
        email: res.email,
        token: res.token
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      // find the user
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError(`The user with email ${email} does not exist.`)
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          const token = jwt.sign(
            { 
              user_id: user._id,
              email
            },
            process.env.JWT_KEY,
            {
              expiresIn: '2h'
            }
          );
          user.token = token;

          return {
            id: user.id,
            username: user.username,
            email: user.email,
            token: user.token
          };
        } else {
          throw new GraphQLError(`The passowrd is wrong.`)
        }
      }
    }
  }
};