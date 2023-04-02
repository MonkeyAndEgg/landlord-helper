import { AddIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";
import BalanceTable from "../../components/BalanceTable/BalanceTable";
import { useContext, useEffect, useState } from "react";
import { Record, RecordInput } from "../../models/record";
import BalanceModal from "../../components/BalanceModal/BalanceModal";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../context/authContext";

const GET_RECORDS = gql`
  query Records($userId: ID!) {
    records(userId: $userId) {
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
  const [ years, setYears ] = useState([] as number[]);
  const authContext = useContext(AuthContext);
  const { loading, error, data, refetch } = useQuery(GET_RECORDS, {
    variables: { userId: authContext && authContext.user ? authContext.user['user_id'] : '' },
    pollInterval: 500,
  });
  const [addRecord, { loading: adding }] = useMutation(ADD_RECORD);
  const [deleteRecord, { loading: deleting }] = useMutation(DELETE_RECORD);

  useEffect(() => {
    if (data) {
      const updatedYears: number[] = [];
      data.records.forEach((record: Record) => {
        const currentYear = new Date(record.date).getUTCFullYear();
        if (!updatedYears.includes(currentYear)) {
          updatedYears.push(currentYear);
        }
      });
      setYears(updatedYears);
    }
  }, [data]);

  const onAddNewRecord = async (record: RecordInput) => {
    if (authContext && authContext.user) {
      await addRecord({ variables: { addRecordInput: { ...record, userId: authContext.user['user_id'] } } });
      refetch({ userId: authContext.user['user_id'] });
    }
    onClose();
  };

  const onDeleteRecord = async (recordId: string) => {
    if (authContext && authContext.user) {
      await deleteRecord({ variables: { recordId } });
      refetch({ userId: authContext.user['user_id'] });
    }
  };

  return (
    <Flex w="100%">
      <Tabs w="100%" variant='enclosed'>
        <TabList>
          { 
            years.map((year: number) => (<Tab key={year}>{year}</Tab>))
          }
        </TabList>
        
        <TabPanels>
          { 
            years.map((year: number) => (
              <TabPanel key={year}>
                <BalanceTable data={data.records} onDeleteRecord={onDeleteRecord} />
              </TabPanel>
            ))
          }
        </TabPanels>
      </Tabs>
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
    </Flex>
  );
}