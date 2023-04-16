import gql from "graphql-tag";

export const GET_RECORDS = gql`
  query Records($getRecordsInput: GetRecordsInput) {
    records(getRecordsInput: $getRecordsInput) {
      id
      title
      category
      date
      amount
      type 
    }
  }
`;

export const ADD_RECORD = gql`
  mutation Mutation($addRecordInput: AddRecordInput) {
    addRecord(addRecordInput: $addRecordInput) {
      amount
      category
      date
      title
      type
    }
  }
`;

export const DELETE_RECORD = gql`
  mutation DeleteRecord($recordId: ID!) {
    deleteRecord(recordId: $recordId) {
      amount
      category
      date
      title
      type
    }
  }
`;