import { Button, Flex, FormControl, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {

  };

  return (
    <Flex w='100%' justifyContent={'center'} alignItems={'center'}>
      <VStack w='350px' spacing={10}>
        <Heading>Login</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input placeholder='username' onChange={(event) => setUsername(event.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input placeholder='password' onChange={(event) => setPassword(event.target.value)} />
        </FormControl>
        <Flex w='100%' justifyContent={'end'}>
          <Button colorScheme='teal' onClick={onLogin}>Login</Button>
        </Flex>
      </VStack>
    </Flex>
  );
}