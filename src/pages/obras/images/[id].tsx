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
import { GetServerSideProps } from 'next';
import { useCan } from '../../../hooks/useValidate';
import { IEnterprise } from '../../../types/Enterprise';
import getPrismicClient from '../../../services/prismic';
import { useEffect } from 'react';
import { Document } from '@prismicio/client/types/documents';

interface HandleEnterpriseImagesProps {
  enterprise: Document;
  id: string;
  images: {
    id: string;
    link: string;
  }[];
}

export default function HandleEnterpriseImages({
  enterprise = null,
  id = null,
  images = null,
}: HandleEnterpriseImagesProps) {
  const router = useRouter();

  const boxBgColor = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.900', 'gray.50');
  const cancelButtonBg = useColorModeValue('gray.200', 'gray.400');

  // const imagesLength = enterprise?.images?.length;

  console.log(enterprise);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <>
      <Head>
        <title>
          {enterprise.data.name[0].text
            ? `Pégaso | ${enterprise.data.name[0].text}`
            : 'Pégaso'}
        </title>
      </Head>

      <Box minH="100vh">
        <Header />

        <Box display="flex" w="100%" my="6" maxWidth={1600} mx="auto" px="4">
          <Sidebar />

          <Flex direction="column" w="100%">
            <Flex direction="column">
              {isWideVersion ? (
                <HStack spacing="6" maxW="100%">
                  <Flex direction="column" w="100%">
                    <Heading fontSize="24" w="100%">
                      Gerenciar imagens
                    </Heading>
                    <Text fontSize="small" mt="1">
                      ID: {id}
                    </Text>
                  </Flex>
                  <AddImageModal
                    documentId={enterprise?.uid}
                    singleFile={false}
                  />
                  <RemoveImageModal removeAllImages />
                </HStack>
              ) : (
                <VStack maxW="100%" my="2">
                  <Heading fontSize="24">Gerenciar imagens</Heading>
                  <Text fontSize="small" mt="1">
                    ID: {id}
                  </Text>
                  <AddImageModal
                    fullWidth
                    documentId={enterprise?.uid}
                    singleFile={false}
                  />
                  <RemoveImageModal removeAllImages fullWidth />
                </VStack>
              )}

              {!enterprise?.data.images.length ? (
                <Text mt="4" fontSize="md">
                  Não existem imagens para essa obra.
                </Text>
              ) : (
                <>
                  <Text mt="4" fontSize="md">
                    {enterprise?.data.images.length <= 0 &&
                      `${enterprise?.data.name} não tem imagens cadastradas.`}
                    {enterprise?.data.images.length === 1 &&
                      `${enterprise?.data.images.length} imagem de ${enterprise?.data.name[0].text}`}
                    {enterprise?.data.images.length > 1 &&
                      `${enterprise?.data.images.length} imagens de ${enterprise?.data.name[0].text}`}
                  </Text>
                </>
              )}
            </Flex>

            <ListImages
              projectsToList={enterprise?.data.images}
              showDetailsButton
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

  const prismic = getPrismicClient();
  const { id } = ctx.query;

  const { results } = await prismic.query('', { pageSize: 100 });
  const findedEnterprise = results.find(
    (enterprise) => enterprise.uid === String(id)
  );

  // const enterprise: IEnterprise = {
  //   id: findedEnterprise.uid,
  //   address: findedEnterprise.data.address[0].text,
  //   banner: findedEnterprise.data.banner.url,
  //   created_at: findedEnterprise.data.created_at,
  //   updated_at: findedEnterprise.data.updated_at,
  //   shortDescription: findedEnterprise.data.short_description[0].text,
  //   description: findedEnterprise.data.description[0].text,
  //   displayOrder: findedEnterprise.data.displayOrder,
  //   name: findedEnterprise.data.name[0].text,
  //   images: findedEnterprise.data.images,
  // };

  return {
    props: {
      id,
      enterprise: findedEnterprise,
    },
  };

  // const { results } = await prismic.getByID('', { pageSize: 100 });

  // const enterprisesData: IEnterprise[] = getEnterprises({
  //   enterprises: results,
  // });

  // return {
  //   props: {
  //     enterprisesSSR: enterprisesData,
  //   },
  // };
};
