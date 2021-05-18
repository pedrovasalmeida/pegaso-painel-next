import Head from 'next/head';

import { Box, Flex, Heading } from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import ListEnterprises from '../../components/ListEnterprises';

export default function EnterpriseList() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <>
      <Head>
        <title>Obras | Pégaso</title>
      </Head>

      <Box minH="100vh">
        <Header />

        <Box display="flex" w="100%" my="6" maxWidth={1600} mx="auto" px="4">
          <Sidebar />

          <Flex direction="column" w="100%">
            <Heading h="10">Gerenciar obras</Heading>

            <ListEnterprises projectsToList={cards} showDetailsButton />
          </Flex>
        </Box>
      </Box>
    </>
  );
}
