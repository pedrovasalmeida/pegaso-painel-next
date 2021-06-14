import { Flex, Text } from '@chakra-ui/react';

import LoginPage from './index';
import { useAuth } from '../contexts/AuthContext';
import { useCan } from '../hooks/useValidate';
import { GetServerSideProps } from 'next';

export default function Enterprises() {
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserValid = await useCan({ ctx });

  if (isUserValid) {
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
