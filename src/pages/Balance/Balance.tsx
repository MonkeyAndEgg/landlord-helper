import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";
import BalanceTable from "../../components/BalanceTable/BalanceTable";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { TYPE } from "../../constants/record-type";
import { Record } from "../../models/record";

const INIT_DATA: Record[] = [
  { title: 'bc hydro', category: 'utility', date: new Date(), amount: '1800', type: TYPE.COST },
  { title: 'mortgage payment', category: 'mortgage', date: new Date(), amount: '2800', type: TYPE.COST },
  { title: 'rent', category: 'rent', date: new Date(), amount: '6000', type: TYPE.INCOME }
];

export default function Balance() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ date, setDate ] = useState(new Date());
  const [ title, setTitle ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ data, setData ] = useState(INIT_DATA);
  const [ type, setType ] = useState(TYPE.INCOME);
  const [ years, setYears ] = useState([] as number[]);

  useEffect(() => {
    const updatedYears: number[] = [];
    data.forEach((record: Record) => {
      const currentYear = record.date.getFullYear();
      if (!updatedYears.includes(currentYear)) {
        updatedYears.push(record.date.getFullYear());
      }
    });
    setYears(updatedYears);
  }, [data]);

  const onAddNewRecord = () => {
    const newRecord = {
      title,
      category,
      date,
      amount,
      type
    }

    // append to the current data
    setData(prev => (
      [
        ...prev,
        newRecord
      ]
    ));
    onClose();
  };

  const onDeleteRecord = (record: Record) => {
    setData(prev => {
      const targetIndex = prev.indexOf(record);
      const newData = [...prev];
      newData.splice(targetIndex, 1);
      return newData;
    });
  };

  return (
    <Flex w="100%">
      <Tabs w="100%" variant='enclosed'>
        <TabList>
          { 
            years.map(year => (<Tab>{year}</Tab>))
          }
        </TabList>
        
        <TabPanels>
          { 
            years.map(year => (
              <TabPanel>
                <BalanceTable data={data} onDeleteRecord={onDeleteRecord} />
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new record</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input placeholder='Title' onChange={(event) => setTitle(event.target.value)} />
              <FormLabel>Category</FormLabel>
              <Select placeholder='Category' onChange={(event) => setCategory(event.target.value)}>
                <option>Utility</option>
                <option>Mortgage</option>
              </Select>
              <FormLabel>Type</FormLabel>
              <Select placeholder='Type' onChange={(event) => setType(event.target.value as TYPE)}>
                <option>{TYPE.INCOME}</option>
                <option>{TYPE.COST}</option>
              </Select>
              <FormLabel>Amount</FormLabel>
              <NumberInput min={0} onChange={(value) => setAmount(value)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <DatePicker selected={date} onChange={(date: any) => setDate(date)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={onAddNewRecord}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}