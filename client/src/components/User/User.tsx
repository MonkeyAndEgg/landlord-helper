import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";

interface IUser {
  user: any
}

export default function User({ user }: IUser) {

  return (
    user && <Flex justifyContent='center' py={5}>
      <Avatar src='https://bit.ly/sage-adebayo' />
      <Box ml='3'>
        <Text fontWeight='bold'>
          {user.username}
          <Badge ml='1' colorScheme='green'>
            Online
          </Badge>
        </Text>
        <Text fontSize='sm'>{user.email}</Text>
      </Box>
    </Flex>
  );
}