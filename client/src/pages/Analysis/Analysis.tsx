import { useQuery } from "@apollo/client";
import { Flex, Text, HStack, Heading, VStack, Select, Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { GET_RECORDS } from "../../query/records";
import { TYPE } from "../../constants/record-type";
import { Record } from "../../models/record";
import AnalysisPieChart from "../../components/AnalysisPieChart/AnalysisPieChart";

const dataMock = [
  { title: 'One', value: 10, color: '#E38627' },
  { title: 'Two', value: 15, color: '#C13C37' },
  { title: 'Three', value: 20, color: '#6A2135' },
];

export default function Analysis() {
  const authContext = useContext(AuthContext);
  const [ yearOptions, setYearOptions ] = useState<number[]>([]);
  const [ currentYearOption, setCurrentYear ] = useState<number>();
  const [ fromDate, setFromDate ] = useState<string>();
  const [ toDate, setToDate ] = useState<string>();
  const { loading, error, data, refetch } = useQuery(GET_RECORDS, {
    variables: { getRecordsInput: { userId: authContext && authContext.user ? authContext.user['user_id'] : '', fromDate, toDate } },
    pollInterval: 500,
  });
  const [ summary, setSummary ] = useState({ totalIncome: 0, totalCost: 0, netIncome: 0 });

  useEffect(() => {
    // initialize year options
    const options = [];
    const currentYear = new Date().getUTCFullYear();
    for (let i = 0; i < 15; i++) {
      options.push(currentYear - i);
    }
    setYearOptions(options);
    setCurrentYear(currentYear);
  }, []);

  useEffect(() => {
    if (data) {
      const records = data.records;
      const costs = records.filter((record: Record) => record.type === TYPE.COST).map((record: Record) => +record.amount);
      const incomes = records.filter((record: Record) => record.type === TYPE.INCOME).map((record: Record) => +record.amount);
      const totalIncome = incomes.reduce((acc: number, curr: number) => acc + curr, 0);
      const totalCost = costs.reduce((acc: number, curr: number) => acc + curr, 0);
      setSummary({ totalIncome, totalCost, netIncome: totalIncome - totalCost });
    }
  }, [data]);

  useEffect(() => {
    if (currentYearOption) {
      setFromDate(`${currentYearOption-1}-${new Date().getUTCMonth()+1}-${new Date().getUTCDate()}`);
      setToDate(`${currentYearOption}-${new Date().getUTCMonth()+1}-${new Date().getUTCDate()}`);
    }
  }, [currentYearOption]);
  
  return (
    <VStack w="100%" spacing={7}>
      <Flex w="100%" justifyContent="start">
        <Select placeholder='Select year' w="200px" value={currentYearOption} onChange={(e) => setCurrentYear(+e.target.value)}>
          {
            yearOptions.map(year => <option value={year} key={year}>{year}</option>)
          }
        </Select>
      </Flex>
      <Flex w="100%" p={10} borderWidth='1px' borderRadius='lg' overflow='hidden' justifyContent="center">
        { error ? (
            <Flex fontWeight={900}>Failed on display summary</Flex>
          ) : (
            <HStack spacing={10} w="100%" justifyContent="space-evenly">
              <VStack alignItems="start">
                <Heading as='h5' size='sm'>
                  Total Income
                </Heading>
                <Text>
                  ${summary.totalIncome}
                </Text>
              </VStack>
              <VStack alignItems="start">
                <Heading as='h5' size='sm'>
                  Total Cost
                </Heading>
                <Text>
                  ${summary.totalCost}
                </Text>
              </VStack>
              <VStack alignItems="start">
                <Heading as='h5' size='sm'>
                  Net Income
                </Heading>
                <Text>
                  ${summary.netIncome}
                </Text>
              </VStack>
            </HStack>
          )
        }
      </Flex>
      <Flex w="100%" h="100%" p={10} borderWidth='1px' borderRadius='lg'>
        <HStack w="100%" justifyContent="space-evenly">
          <VStack spacing={5}>
            <Box fontWeight={900}>
              Total Income
            </Box>
            <Box>
              <AnalysisPieChart data={dataMock} />
            </Box>
          </VStack>
          <VStack spacing={5}>
            <Box fontWeight={900}>
              Total Cost
            </Box>
            <AnalysisPieChart data={dataMock} />
          </VStack>
        </HStack>
      </Flex>
    </VStack>
  );
}