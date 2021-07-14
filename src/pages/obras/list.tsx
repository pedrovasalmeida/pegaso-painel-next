import Head from 'next/head';

import { Box, Flex, Heading } from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import ListEnterprises from '../../components/ListEnterprises';
import { GetServerSideProps } from 'next';
import { IEnterprise } from '../../types/Enterprise';
import LoginPage from './index';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useCan } from '../../hooks/useValidate';
import { getEnterprises } from '../../hooks/getEnterprises';

interface EnterpriseProps {
  enterprisesSSR: IEnterprise[];
}

export default function EnterpriseList({
  enterprisesSSR = [],
}: EnterpriseProps) {
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
            <Heading h="10">Gerenciar obras</Heading>

            <ListEnterprises enterprises={enterprisesSSR} showDetailsButton />
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
