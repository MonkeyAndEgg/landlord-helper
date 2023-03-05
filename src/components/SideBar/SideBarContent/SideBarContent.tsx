import { Box, Flex, Link, VStack } from "@chakra-ui/react";
import User from "../../User/User";

export default function SideBarContent() {


  return (
    <Box>
      <User />

      <VStack
        mt={20}
        spacing={10}
        align='stretch'
      >
        
        <Link href='/balance'>
          <Flex h='40px' cursor='pointer' justifyContent='center'>
            Balance
          </Flex>
        </Link>

        <Link href='/analysis'>
          <Flex h='40px' cursor='pointer' justifyContent='center'>
            Analysis
          </Flex>
        </Link>

        <Link href='/routine'>
          <Flex h='40px' cursor='pointer' justifyContent='center'>
            Routine
          </Flex>
        </Link>
      </VStack>
    </Box>
  );
}