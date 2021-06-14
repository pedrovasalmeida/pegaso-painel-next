import { Flex, Heading, Button, useBreakpointValue } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import nookies from 'nookies';

import { Header } from '../components/Header';
import ListEnterprises from '../components/ListEnterprises';
import { Sidebar } from '../components/Sidebar';
import LoginPage from './index';

import { IFinalEnterprise, IUser } from '../types/IEnterprise';
import { api, apiSsr } from '../services/api';

import { validateUser } from '../hooks/validateUser';
import { useCan } from '../hooks/useValidate';
import { getEnterprises } from '../hooks/getEnterprises';

interface DashboardProps {
  enterprisesSSR: IFinalEnterprise[];
}

export default function Dashboard({ enterprisesSSR = [] }: DashboardProps) {
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

          <Flex direction="column" w="100%">
            <Flex justify="space-between" w="100%">
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

            <Flex w="100%">
              <ListEnterprises
                enterprises={enterprisesSSR}
                showDetailsButton
                showOnlyDetailsButton
              />
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
