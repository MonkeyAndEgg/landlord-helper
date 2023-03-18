import { useMutation } from "@apollo/client";
import { Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import gql from "graphql-tag";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import useForm from "../../hooks/useForm";

const REGISTER_USER = gql`
  mutation Mutation(
    $registerInput: RegisterInput
  ) {
    registerUser(
      registerInput: $registerInput
    ) {
      email
      username
      token
    }
  }
`;

export default function Signup() {
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const signupCallback = () => {
    console.log('calling back');
    registerUser();
  };

  const { onChange, onSubmit, values } = useForm(signupCallback, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      authContext.login(userData);
      navigate('/');
    },
    onError(err) {
      setError(err.message);
    },
    variables: { registerInput: values }
  });

  return (
    <Flex w='100%' justifyContent={'center'} alignItems={'center'}>
      <VStack w='350px' spacing={10}>
        <Heading>Sign Up</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input placeholder='username' name='username' onChange={onChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder='email' name='email' onChange={onChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input placeholder='password' name='password' onChange={onChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input placeholder='confirm password' name='confirmPassword' onChange={onChange} />
        </FormControl>
        <Text>{error}</Text>
        <Flex w='100%' justifyContent={'end'}>
          <Button colorScheme='teal' onClick={()=>{console.log(values);onSubmit();}}>Register</Button>
        </Flex>
      </VStack>
    </Flex>
  );
}