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
import { getEnterprises } from '../hooks/prismic/getEnterprises';
import { useCan } from '../hooks/useValidate';
import getPrismicClient from '../services/prismic';
import { IEnterprise } from '../types/Enterprise';
import LoginPage from './index';

interface ImagesProps {
  enterprisesSSR: IEnterprise[];
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
        <title>Pégaso | Imagens</title>
      </Head>

      <Flex direction="column" minH="100vh">
        <Header />

        <Flex w="100%" maxWidth={1600} my="6" mx="auto" px="4">
          <Sidebar />

          <Flex direction="column">
            <Heading>Gerenciar imagens</Heading>

            {enterprisesSSR.length < 1 ? (
              <Flex>
                <Text>Não existem obras cadastradas.</Text>
              </Flex>
            ) : (
              <>
                <Text my="3" fontSize="md">
                  Selecione uma obra para adicionar ou remover imagens.
                </Text>

                <ListEnterprises
                  enterprises={enterprisesSSR}
                  showOnlyDetailsButton
                  showImagesButton
                />
              </>
            )}
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

  const prismic = getPrismicClient();

  const { results } = await prismic.query('', { pageSize: 100 });

  const enterprisesData: IEnterprise[] = getEnterprises({
    enterprises: results,
  });

  return {
    props: {
      enterprisesSSR: enterprisesData,
    },
  };
};
