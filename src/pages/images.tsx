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

export default function Images() {
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
        <title>Imagens | Pégaso</title>
      </Head>

      <Flex direction="column" minH="100vh">
        <Header />

        <Flex w="100%" maxWidth={1600} my="6" mx="auto" px="4">
          <Sidebar />

          <Flex direction="column">
            <Heading>Gerenciar imagens</Heading>

            <Text my="3" fontSize="md">
              Selecione uma obra para adicionar ou remover imagens.
            </Text>
            <Flex
              direction="column"
              w={!isWideVersion ? '100%' : '100%'}
              align="flex-end"
            >
              <Flex>
                <ListEnterprises
                  projectsToList={cards}
                  showOnlyDetailsButton
                  showImagesButton
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
