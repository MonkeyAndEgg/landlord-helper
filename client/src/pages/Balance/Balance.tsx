import { AddIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";
import BalanceTable from "../../components/BalanceTable/BalanceTable";
import { useEffect, useState } from "react";
import { TYPE } from "../../constants/record-type";
import { Record } from "../../models/record";
import BalanceModal from "../../components/BalanceModal/BalanceModal";

const INIT_DATA: Record[] = [
  { title: 'bc hydro', category: 'utility', date: '2023-01-01', amount: '1800', type: TYPE.COST },
  { title: 'mortgage payment', category: 'mortgage', date: '2023-01-01', amount: '2800', type: TYPE.COST },
  { title: 'rent', category: 'rent', date: '2023-01-01', amount: '6000', type: TYPE.INCOME }
];

export default function Balance() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ data, setData ] = useState(INIT_DATA);
  const [ years, setYears ] = useState([] as number[]);

  useEffect(() => {
    const updatedYears: number[] = [];
    data.forEach((record: Record) => {
      const currentYear = new Date(record.date).getFullYear();
      if (!updatedYears.includes(currentYear)) {
        updatedYears.push(currentYear);
      }
    });
    setYears(updatedYears);
  }, [data]);

  const onAddNewRecord = (record: Record) => {
    // append to the current data
    setData(prev => (
      [
        ...prev,
        record
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
            years.map(year => (<Tab key={year}>{year}</Tab>))
          }
        </TabList>
        
        <TabPanels>
          { 
            years.map(year => (
              <TabPanel key={year}>
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
      <BalanceModal isOpen={isOpen} onClose={onClose} onAddNewRecord={onAddNewRecord} />
    </Flex>
  );
}