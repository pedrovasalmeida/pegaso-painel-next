import Head from 'next/head';

import { Box, Text } from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { GetServerSideProps } from 'next';

import 'firebase/firestore';
import { useCan } from '../../hooks/useValidate';

interface EnterpriseProps {
  enterprisesSSR: any;
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

          <Text>Página offline.</Text>
          {/* <Flex direction="column" w="100%">
            <Heading h="10">Gerenciar obras</Heading>

            <ListEnterprises
              enterprises={enterprisesSSR?.data}
              showDetailsButton
            />
          </Flex> */}
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

  // const prismic = getPrismicClient();

  // const { results } = await prismic.query('', { pageSize: 100 });

  // const enterprisesData: IEnterprise[] = getEnterprises({
  //   enterprises: results,
  // });

  return {
    props: {
      enterprisesSSR: [],
    },
  };
};
