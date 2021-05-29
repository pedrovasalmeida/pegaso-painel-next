import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
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

  const totalDeImagens: number = 18;

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <>
      <Head>
        <title>NOME DA OBRA | Pégaso</title>
      </Head>

      <Box minH="100vh">
        <Header />

        <Box display="flex" w="100%" my="6" maxWidth={1600} mx="auto" px="4">
          <Sidebar />

          <Flex direction="column" w="100%">
            <Flex direction="column">
              <Heading fontSize="24">Gerenciar imagens</Heading>

              <Text mt="4" fontSize="md">
                {totalDeImagens <= 0 &&
                  `Essa obra não tem imagens cadastradas.`}
                {totalDeImagens === 1 &&
                  `${totalDeImagens} imagem da obra NOME`}
                {totalDeImagens > 1 && `${totalDeImagens} imagens da obra NOME`}
              </Text>
              {/* <Text fontSize="small" mt="1">
                  ID: {id}
                </Text> */}

              {isWideVersion ? (
                <HStack ml="auto" spacing="6" maxW="100%">
                  <AddImageModal />
                  <RemoveImageModal removeAllImages />
                </HStack>
              ) : (
                <VStack maxW="100%" my="2">
                  <AddImageModal fullWidth />
                  <RemoveImageModal removeAllImages fullWidth />
                </VStack>
              )}
            </Flex>

            <ListImages projectsToList={cards} showDetailsButton />
          </Flex>
        </Box>
      </Box>
    </>
  );
}
