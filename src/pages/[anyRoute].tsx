import { Flex, Text } from '@chakra-ui/react';

import LoginPage from './index';
import { useAuth } from '../contexts/AuthContext';

export default function Enterprises() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Flex direction="column" h="100vh" w="100vw" bg="gray.50">
      <Text
        mx="auto"
        mt="auto"
        fontSize="30"
        fontWeight="bold"
        color="gray.700"
      >
        Página em construção!
      </Text>
      <Text mx="auto" mt="2" mb="auto" fontSize="15" color="gray.500">
        Pégaso - 2021 &copy;
      </Text>
    </Flex>
  );
}
