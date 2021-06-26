import Head from 'next/head';

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Tooltip,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import ListEnterprises from '../../components/ListEnterprises';
import ListSort from '../../components/ListSort';
import { useState } from 'react';
import LoginPage from './index';
import { useAuth } from '../../contexts/AuthContext';
import { useCan } from '../../hooks/useValidate';
import { GetServerSideProps } from 'next';
import { getEnterprises } from '../../hooks/getEnterprises';
import { IFinalEnterprise } from '../../types/IEnterprise';
import { saveEnterpriseOrderChanges } from '../../hooks/saveChangesEnterpriseOrder';

interface SortEnterpriseProps {
  enterprisesSSR: IFinalEnterprise[];
}

export default function SortEnterprises({
  enterprisesSSR,
}: SortEnterpriseProps) {
  const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [changedEnterprises, setChangedEnterprises] = useState<
    IFinalEnterprise[]
  >([]);

  const toast = useToast();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  async function handleSaveChanges() {
    setLoadingSaveChanges(true);

    try {
      await saveEnterpriseOrderChanges({
        enterprises: changedEnterprises,
      });

      toast({
        title: `Alterações salvas`,
        status: 'success',
        duration: 1500,
        isClosable: true,
      });

      setLoadingSaveChanges(false);
    } catch (err) {
      toast({
        title: `Ocorreu um erro`,
        status: 'error',
        duration: 1500,
        isClosable: true,
      });

      setLoadingSaveChanges(false);
    }
  }

  return (
    <>
      <Head>
        <title>Pégaso | Obras</title>
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
              maxW={isWideVersion ? '500px' : '100%'}
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

            <ListSort
              enterprises={enterprisesSSR}
              hasChanges={setHasChanges}
              setNewEnterprises={setChangedEnterprises}
            />
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserValid = await useCan({ ctx });

  if (!isUserValid) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const enterprisesSSR = await getEnterprises();

  if (!enterprisesSSR) {
    return {
      props: {},
    };
  }

  return {
    props: {
      enterprisesSSR,
    },
  };
};
