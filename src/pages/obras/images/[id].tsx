import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import ListImages from '../../../components/ListImages';
import Head from 'next/head';
import { RemoveImageModal } from '../../../components/Modal/RemoveImage';
import { useRouter } from 'next/router';
import { AddImageModal } from '../../../components/Modal/AddImage';
import { useEnterpriseContext } from '../../../contexts/EnterprisesContext';
import LoginPage from '../../index';
import { useAuth } from '../../../contexts/AuthContext';
import { GetServerSideProps } from 'next';
import { useCan } from '../../../hooks/useValidate';
import { IFinalEnterprise } from '../../../types/IEnterprise';
import { getOneEnterprises } from '../../../hooks/getOneEnterprise';

interface HandleEnterpriseImagesProps {
  enterprise: IFinalEnterprise;
}

export default function HandleEnterpriseImages({
  enterprise,
}: HandleEnterpriseImagesProps) {
  const router = useRouter();

  const boxBgColor = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.900', 'gray.50');
  const cancelButtonBg = useColorModeValue('gray.200', 'gray.400');

  const totalDeImagens = enterprise.images.length;

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <>
      <Head>
        <title>{enterprise.name} | Pégaso</title>
      </Head>

      <Box minH="100vh">
        <Header />

        <Box display="flex" w="100%" my="6" maxWidth={1600} mx="auto" px="4">
          <Sidebar />

          <Flex direction="column" w="100%">
            <Flex direction="column">
              <Heading fontSize="24">Gerenciar imagens</Heading>

              <Text mt="4" fontSize="md">
                {totalDeImagens <= 0 &&
                  `${enterprise.name} não tem imagens cadastradas.`}
                {totalDeImagens === 1 &&
                  `${totalDeImagens} imagem de ${enterprise.name}`}
                {totalDeImagens > 1 &&
                  `${totalDeImagens} imagens de ${enterprise.name}`}
              </Text>
              {/* <Text fontSize="small" mt="1">
                  ID: {id}
                </Text> */}

              {isWideVersion ? (
                <HStack ml="auto" spacing="6" maxW="100%">
                  <AddImageModal
                    documentId={enterprise.id}
                    singleFile={false}
                  />
                  <RemoveImageModal removeAllImages />
                </HStack>
              ) : (
                <VStack maxW="100%" my="2">
                  <AddImageModal
                    fullWidth
                    documentId={enterprise.id}
                    singleFile={false}
                  />
                  <RemoveImageModal removeAllImages fullWidth />
                </VStack>
              )}
            </Flex>

            <ListImages projectsToList={enterprise.images} showDetailsButton />
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

  const { id } = ctx.query;

  const parsedId = String(id);

  const enterprise = await getOneEnterprises({ id: parsedId });

  return {
    props: {
      enterprise,
    },
  };
};
