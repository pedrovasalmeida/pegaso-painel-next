import Head from 'next/head';

import { Box, Flex, Heading } from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import ListEnterprises from '../../components/ListEnterprises';
import ListSort from '../../components/ListSort';

export default function SortEnterprises() {
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
            <Heading h="10">Ordenar obras</Heading>

            <ListSort />
          </Flex>
        </Box>
      </Box>
    </>
  );
}
