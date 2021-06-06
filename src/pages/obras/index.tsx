import { useState } from 'react';
import NextLink from 'next/link';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
} from '@chakra-ui/react';

import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';
import LoginPage from '../index';
import { useAuth } from '../../contexts/AuthContext';

export default function Enterprises() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const [page, setPage] = useState(1);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutos
      }
    );
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
