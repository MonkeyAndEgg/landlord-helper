import { useMutation } from "@apollo/client";
import { Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import gql from "graphql-tag";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import useForm from "../../hooks/useForm";

const LOGIN_USER = gql`
  mutation Mutation(
    $loginInput: LoginInput
  ) {
    loginUser(
      loginInput: $loginInput
    ) {
      email
      username
      token
    }
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState('');

  const loginCallback = () => {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginCallback, {
    email: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      authContext.login(userData);
      navigate('/');
    },
    onError(err) {
      setError(err.message);
    },
    variables: { loginInput: values }
  });

  return (
    <Flex w='100%' justifyContent={'center'} alignItems={'center'}>
      <VStack w='350px' spacing={10}>
        <Heading>Login</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder='email' name='email' onChange={onChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input placeholder='password' name='password' onChange={onChange} />
        </FormControl>
        <Text>{error}</Text>
        <Flex w='100%' justifyContent={'end'}>
          <Button colorScheme='teal' onClick={onSubmit}>Login</Button>
        </Flex>
      </VStack>
    </Flex>
  );
}