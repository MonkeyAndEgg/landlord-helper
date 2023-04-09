import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (fromDate: string, toDate: string) => void;
}

export default function FilterModal({ isOpen, onClose, onApplyFilter }: FilterModalProps) {
  const [ fromDate, setFromDate ] = useState(``);
  const [ toDate, setToDate ] = useState(``);

  const applyFilter = () => {
    onApplyFilter(fromDate, toDate);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Custom Filter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
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
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost' onClick={applyFilter}>Filter</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}