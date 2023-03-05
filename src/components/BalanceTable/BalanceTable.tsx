import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Record } from "../../models/record";

interface BalanceTableProps {
  data: Record[]
}

export default function BalanceTable({ data }: BalanceTableProps) {
  const labels = ['Title', 'Category', 'Date', 'Amount', 'Action'];

  return (
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
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
                <Td>{item.date.toDateString()}</Td>
                <Td>{item.amount}</Td>
                <Td></Td>
              </Tr>
            )
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
}