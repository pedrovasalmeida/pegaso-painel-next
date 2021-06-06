import Head from 'next/head';

import { Box, Flex, Heading } from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import ListEnterprises from '../../components/ListEnterprises';
import { GetServerSideProps } from 'next';
import { IFinalEnterprise } from '../../types/IEnterprise';
import LoginPage from './index';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

interface EnterpriseProps {
  enterprisesSSR: IFinalEnterprise[];
}

export default function EnterpriseList({ enterprisesSSR }: EnterpriseProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
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
            <Heading h="10">Gerenciar obras</Heading>

            <ListEnterprises enterprises={enterprisesSSR} showDetailsButton />
          </Flex>
        </Box>
      </Box>
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
