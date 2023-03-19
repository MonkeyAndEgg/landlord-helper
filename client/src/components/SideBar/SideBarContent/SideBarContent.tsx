import { Box, Flex, Link, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import User from "../../User/User";

export default function SideBarContent() {
  const authContext = useContext(AuthContext);

  return (
    <Box>
      <User user={authContext.user} />

      <VStack
        mt={20}
        spacing={10}
        align='stretch'
      >
        { authContext.user ? (
          <>
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

            <Link href='/login'>
              <Flex h='40px' cursor='pointer' justifyContent='center'>
                Logout
              </Flex>
            </Link>
          </>
        ) : (
          <>
            <Link href='/login'>
              <Flex h='40px' cursor='pointer' justifyContent='center'>
                Login
              </Flex>
            </Link>

            <Link href='/signup'>
              <Flex h='40px' cursor='pointer' justifyContent='center'>
                Signup
              </Flex>
            </Link>
          </>
        ) }
      </VStack>
    </Box>
  );
}