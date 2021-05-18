import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  theme,
  Heading,
  Icon,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { TiPlus } from 'react-icons/ti';

import { Header } from '../components/Header';
import ListEnterprises from '../components/ListEnterprises';
import { Sidebar } from '../components/Sidebar';

export default function Dashboard() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const router = useRouter();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handleManageEnterprise() {
    router.push('/obras/list');
  }

  return (
    <>
      <Head>
        <title>Dashboard | Pégaso</title>
      </Head>

      <Flex direction="column" minH="100vh">
        <Header />

        <Flex w="100%" maxWidth={1600} my="6" mx="auto" px="4">
          <Sidebar />

          <Flex direction="column">
            <Flex>
              <Heading>Seja bem vindo!</Heading>
              <Button
                my="auto"
                ml="auto"
                bgColor="blue.700"
                color="gray.50"
                _hover={{ bgColor: 'blue.800' }}
                size="md"
                fontSize="sm"
                onClick={handleManageEnterprise}
              >
                Gerenciar Obras
              </Button>
            </Flex>

            <Flex
              direction="column"
              w={!isWideVersion ? '100%' : '100%'}
              align="flex-end"
            >
              <Flex>
                <ListEnterprises
                  projectsToList={cards}
                  showDetailsButton
                  showOnlyDetailsButton
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
