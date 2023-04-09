import { AddIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton, Input, VStack, useDisclosure } from "@chakra-ui/react";
import BalanceTable from "../../components/BalanceTable/BalanceTable";
import { useContext, useState } from "react";
import { RecordInput } from "../../models/record";
import BalanceModal from "../../components/BalanceModal/BalanceModal";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../context/authContext";

const GET_RECORDS = gql`
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

const ADD_RECORD = gql`
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

const DELETE_RECORD = gql`
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

export default function Balance() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ fromDate, setFromDate ] = useState(`${new Date().getUTCFullYear()-1}-${new Date().getUTCMonth()+1}-${new Date().getUTCDate()}`);
  const [ toDate, setToDate ] = useState(`${new Date().getUTCFullYear()}-${new Date().getUTCMonth()+1}-${new Date().getUTCDate()}`);
  const authContext = useContext(AuthContext);
  const { loading, error, data, refetch } = useQuery(GET_RECORDS, {
    variables: { getRecordsInput: { userId: authContext && authContext.user ? authContext.user['user_id'] : '', fromDate, toDate } },
    pollInterval: 500,
  });
  const [addRecord, { loading: adding }] = useMutation(ADD_RECORD);
  const [deleteRecord, { loading: deleting }] = useMutation(DELETE_RECORD);

  const onAddNewRecord = async (record: RecordInput) => {
    if (authContext && authContext.user) {
      await addRecord({ variables: { addRecordInput: { ...record, userId: authContext.user['user_id'] } } });
      refetch({ getRecordsInput: { userId: authContext.user['user_id'], fromDate, toDate } });
    }
    onClose();
  };

  const onDeleteRecord = async (recordId: string) => {
    if (authContext && authContext.user) {
      await deleteRecord({ variables: { recordId } });
      refetch({ getRecordsInput: { userId: authContext.user['user_id'], fromDate, toDate } });
    }
  };

  const onSelectDateRange = (fromDate: string, toDate: string) => {
    setFromDate(fromDate);
    setToDate(toDate);
  };

  return (
    <VStack w="100%">
      <HStack justifyContent="flex-start">
        <Button colorScheme='teal' variant='ghost' onClick={() => onSelectDateRange(`${new Date().getUTCFullYear()-1}-${new Date().getUTCMonth()+1}-${new Date().getUTCDate()}`, `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()+1}-${new Date().getUTCDate()}`)}>
          Last Year
        </Button>

        <Input
          placeholder="From"
          size="md"
          type="date"
          onChange={(event) => setFromDate(event.target.value)}
        />
        <Input
          placeholder="To"
          size="md"
          type="date"
          onChange={(event) => setToDate(event.target.value)}
        />
      </HStack>
      
        
      { data && <BalanceTable data={data.records} onDeleteRecord={onDeleteRecord} /> }
      <IconButton
        aria-label='New record'
        colorScheme='teal'
        icon={<AddIcon />}
        position="absolute"
        bottom={20}
        right={20}
        size="lg"
        onClick={onOpen}
      />
      <BalanceModal isOpen={isOpen} onClose={onClose} onAddNewRecord={onAddNewRecord} />
    </VStack>
  );
}