import { Flex, Heading, Button, useBreakpointValue } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

import { Header } from '../components/Header';
import ListEnterprises from '../components/ListEnterprises';
import { Sidebar } from '../components/Sidebar';
import LoginPage from './index';

import firebase from 'firebase/app';
import 'firebase/firestore';

import { IFinalEnterprise, IUser } from '../types/IEnterprise';

interface DashboardProps {
  enterprisesSSR: IFinalEnterprise[];
}

export default function Dashboard({ enterprisesSSR }: DashboardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    console.log(`Autenticado: ${isAuthenticated}`);
    return <LoginPage />;
  }

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

export const getServerSideProps: GetServerSideProps = async () => {
  const dataFb = await firebase.firestore().collection('enterprises').get();

  const enterprises = dataFb.docs.map((doc) => doc.data());

  if (enterprises.length === 0) {
    return {
      props: {
        enterprisesSSR: [],
      },
    };
  }

  const finalEnterprises = enterprises.sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return {
    props: {
      enterprisesSSR: finalEnterprises,
    },
  };
};
