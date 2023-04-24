import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from "@chakra-ui/react";
import { useState } from "react";
import { TYPE } from "../../constants/record-type";
import { RecordInput } from "../../models/record";
import { CATEGORY } from "../../constants/category";

interface BalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewRecord: (record: RecordInput) => void;
}

export default function BalanceModal({ isOpen, onClose, onAddNewRecord }: BalanceModalProps) {
  const [ date, setDate ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ type, setType ] = useState(TYPE.INCOME);

  return (
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
              {
                CATEGORY.map((item: { label: string, color: string }) => <option>{item.label}</option>)
              }
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
            <FormLabel>Date</FormLabel>
            <Input
              placeholder="Select Date"
              size="md"
              type="date"
              onChange={(event) => setDate(event.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost' onClick={() => onAddNewRecord({ title, category, date, amount, type })}>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}