import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Record } from "../../models/record";
import { TYPE } from "../../constants/record-type";

interface BalanceTableProps {
  data: Record[];
  onDeleteRecord: (recordId: string) => void;
}

export default function BalanceTable({ data, onDeleteRecord }: BalanceTableProps) {
  const labels = ['Title', 'Category', 'Date', 'Amount', 'Action'];

  return (
    <TableContainer w="100%" overflowY="auto">
      <Table variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            { 
              labels && labels.map(label => <Th key={label}>{label}</Th>)
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            data && data.map(item =>
              <Tr key={item.id}>
                <Td>{item.title}</Td>
                <Td>{item.category}</Td>
                <Td>{item.date}</Td>
                <Td color={item.type === TYPE.INCOME ? 'green' : 'red'}>{item.amount}</Td>
                <Td>
                  <IconButton
                    aria-label='delete record'
                    icon={<DeleteIcon />}
                    onClick={() => onDeleteRecord(item.id)}
                  />
                </Td>
              </Tr>
            )
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
}