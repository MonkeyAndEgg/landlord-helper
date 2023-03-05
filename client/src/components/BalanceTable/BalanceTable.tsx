import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Record } from "../../models/record";

interface BalanceTableProps {
  data: Record[];
  onDeleteRecord: (record: Record) => void;
}

export default function BalanceTable({ data, onDeleteRecord }: BalanceTableProps) {
  const labels = ['Title', 'Category', 'Date', 'Amount', 'Action'];

  return (
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            { 
              labels && labels.map(label => <Th>{label}</Th>)
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            data && data.map(item =>
              <Tr>
                <Td>{item.title}</Td>
                <Td>{item.category}</Td>
                <Td>{item.date}</Td>
                <Td>{item.amount}</Td>
                <Td>
                  <IconButton
                    aria-label='delete record'
                    icon={<DeleteIcon />}
                    onClick={() => onDeleteRecord(item)}
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