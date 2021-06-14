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
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { TiPlus } from 'react-icons/ti';

import { Header } from '../components/Header';
import ListEnterprises from '../components/ListEnterprises';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { useEnterpriseContext } from '../contexts/EnterprisesContext';
import { getEnterprises } from '../hooks/getEnterprises';
import { useCan } from '../hooks/useValidate';
import { IFinalEnterprise } from '../types/IEnterprise';
import LoginPage from './index';

interface ImagesProps {
  enterprisesSSR: IFinalEnterprise[];
}

export default function Images({ enterprisesSSR }: ImagesProps) {
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
                  enterprises={enterprisesSSR}
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
