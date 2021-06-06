import Head from 'next/head';

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import ListEnterprises from '../../components/ListEnterprises';
import ListSort from '../../components/ListSort';
import { useState } from 'react';
import LoginPage from './index';
import { useAuth } from '../../contexts/AuthContext';

export default function SortEnterprises() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handleSaveChanges() {
    setLoadingSaveChanges(true);

    await new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    });

    setLoadingSaveChanges(false);
  }

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
            <Flex
              justify="space-between"
              alignSelf="center"
              align="center"
              mb="4"
              w="100%"
              maxW="500px"
            >
              <Heading h="10">Ordenar obras</Heading>

              <Tooltip
                hasArrow
                label={hasChanges ? '' : 'Nada foi alterado ainda.'}
                isDisabled={hasChanges}
                bg="blue.800"
              >
                <Flex>
                  <Button
                    color="gray.50"
                    bg="blue.700"
                    _hover={{ bgColor: 'blue.900' }}
                    disabled={!hasChanges}
                    isLoading={loadingSaveChanges}
                    onClick={handleSaveChanges}
                  >
                    {isWideVersion ? 'Salvar alterações' : 'Salvar'}
                  </Button>
                </Flex>
              </Tooltip>
            </Flex>

            <ListSort />
          </Flex>
        </Box>
      </Box>
    </>
  );
}
