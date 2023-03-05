import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";

export default function User() {
  return (
    <Flex justifyContent='center' py={5}>
      <Avatar src='https://bit.ly/sage-adebayo' />
      <Box ml='3'>
        <Text fontWeight='bold'>
          Segun Adebayo
          <Badge ml='1' colorScheme='green'>
            Online
          </Badge>
        </Text>
        <Text fontSize='sm'>UI Engineer</Text>
      </Box>
    </Flex>
  );
}