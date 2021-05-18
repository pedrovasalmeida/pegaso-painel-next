import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import ListImages from '../../../components/ListImages';
import Head from 'next/head';
import { RemoveImageModal } from '../../../components/Modal/RemoveImage';
import { useRouter } from 'next/router';
import { AddImageModal } from '../../../components/Modal/AddImage';

export default function UserList() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const router = useRouter();

  const { id } = router.query;

  const boxBgColor = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.900', 'gray.50');
  const cancelButtonBg = useColorModeValue('gray.200', 'gray.400');

  return (
    <>
      <Head>
        <title>Imagens | Pégaso</title>
      </Head>

      <Box minH="100vh">
        <Header />

        <Box display="flex" w="100%" my="6" maxWidth={1600} mx="auto" px="4">
          <Sidebar />

          <Flex direction="column" w="100%">
            <Flex>
              <Flex direction="column">
                <Heading h="10">Gerenciar imagens</Heading>

                <Text mt="4" fontSize="lg">
                  Lista de todas imagens da obra NOME
                </Text>
                <Text fontSize="sm">ID: {id}</Text>
              </Flex>
              <HStack ml="auto" spacing="6">
                <AddImageModal />
                <RemoveImageModal removeAllImages />
              </HStack>
            </Flex>

            <ListImages projectsToList={cards} showDetailsButton />
          </Flex>
        </Box>
      </Box>
    </>
  );
}
