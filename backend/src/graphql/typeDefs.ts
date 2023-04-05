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
    id: ID
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

  input GetRecordsInput {
    userId: ID!
    fromDate: String
    toDate: String
  }

  type Query {
    records(getRecordsInput: GetRecordsInput): [Record]
  }

  type Mutation {
    addRecord(addRecordInput: AddRecordInput): Record
    deleteRecord(recordId: ID!): Record
  }
`;

export const typeDefs = `
  ${userTypeDefs}
  ${recordTypeDefs}
`;