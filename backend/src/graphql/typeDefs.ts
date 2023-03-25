const userTypeDefs = `
  type User {
    username: String
    email: String
    password: String
    token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;

const recordTypeDefs = `
  type Record {
    title: String
    category: String
    date: String
    amount: String
    type: String
    userId: ID
  }

  input AddRecordInput {
    title: String!
    category: String!
    date: String!
    amount: String!
    type: String!
    userId: ID!
  }

  type Query {
    records(userId: ID!): [Record]
  }

  type Mutation {
    addRecord(addRecordInput: AddRecordInput): Record
  }
`;

export const typeDefs = `
  ${userTypeDefs}
  ${recordTypeDefs}
`;