// Needed
import { Flex, Heading, Button, useBreakpointValue } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import { Header } from '../components/Header';
import ListEnterprises from '../components/ListEnterprises';
import { Sidebar } from '../components/Sidebar';

// Types
import { IEnterprise } from '../types/Enterprise';

// Hooks
import { useCan } from '../hooks/useValidate';
import { getEnterprises } from '../hooks/prismic/getEnterprises';
import getPrismicClient from '../services/prismic';
import { useEffect } from 'react';

interface DashboardProps {
  enterprisesSSR: IEnterprise[];
}

export default function Dashboard({ enterprisesSSR = [] }: DashboardProps) {
  const router = useRouter();

  useEffect(() => {
    console.log(enterprisesSSR);
  }, [enterprisesSSR]);

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
        <title>Pégaso | Dashboard</title>
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

            <ListEnterprises
              enterprises={enterprisesSSR}
              showDetailsButton
              showOnlyDetailsButton
            />
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
