import Link from 'next/link';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useMutation } from 'react-query';

import { useForm, SubmitHandler } from 'react-hook-form';

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  useColorModeValue,
  useBreakpointValue,
  toast,
  useToast,
} from '@chakra-ui/react';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { TextArea } from '../../components/Form/TextArea';
import Head from 'next/head';
import { AddImageModal } from '../../components/Modal/AddImage';
import { useRef, useState } from 'react';
import LoginPage from './index';
import { useAuth } from '../../contexts/AuthContext';

type CreateEnterpriseFormData = {
  name: string;
  description: string;
  shortDescription: string;
  address: string;
  banner: string;
};

const createEnterpriseFormSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  description: yup.string().required('A descrição é obrigatória'),
  shortDescription: yup.string().required('A descrição curta é obrigatória'),
  address: yup.string().required('O endereço é obrigatório'),
});

export default function CreateEnterprise() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const [creationLoading, setCreationLoading] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createEnterpriseFormSchema),
  });
  const { errors } = formState;

  const handleCreateEnterprise: SubmitHandler<CreateEnterpriseFormData> =
    async (values) => {
      setCreationLoading(true);

      try {
        const enterpriseData = {
          banner: bannerRef.current?.value || 'invalid_link',
          ...values,
        };

        await api.post('createEnterprise', enterpriseData);

        toast({
          title: 'Obra cadastrada.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        setCreationLoading(false);

        setTimeout(() => {
          router.push('/obras/list');
        }, 1000);
      } catch (err) {
        setCreationLoading(false);

        toast({
          title: 'Ocorreu um erro',
          description: 'Tente novamente em alguns segundos.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    };

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const boxBgColor = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.900', 'gray.50');
  const cancelButtonBg = useColorModeValue('gray.200', 'gray.400');

  const bannerRef = useRef(null);

  return (
    <>
      <Head>
        <title>Criar obra | Pégaso</title>
      </Head>

      <Box h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1600} mx="auto" px="4">
          <Sidebar />

          <Box
            as="form"
            flex="1"
            borderRadius={8}
            bg={boxBgColor}
            color={color}
            p={['6', '8']}
            onSubmit={handleSubmit(handleCreateEnterprise)}
          >
            <Heading size="lg" fontWeight="normal">
              Cadastrar uma obra
            </Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              {/* <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%"> */}
              <Input
                name="nome"
                label="Nome da obra"
                {...register('name')}
                type="text"
                error={errors.name}
              />
              <TextArea
                name="description"
                label="Descrição da obra"
                error={errors.description}
                {...register('description')}
              />
              {/* </SimpleGrid> */}
              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  name="mini-description"
                  type="text"
                  label="Descrição curta"
                  error={errors.shortDescription}
                  {...register('shortDescription')}
                />
                <Input
                  name="adress"
                  type="text"
                  label="Endereço"
                  error={errors.address}
                  {...register('address')}
                />
              </SimpleGrid>
              <Input display="none" name="banner" type="text" ref={bannerRef} />
              <AddImageModal
                singleFile
                fullWidth
                createEnterprisePage
                inputRef={bannerRef}
              />
            </VStack>

            <Flex mt="8" justify={isWideVersion ? 'flex-end' : 'center'}>
              <HStack spacing="4">
                <Link href="/dashboard" passHref>
                  <Button
                    as="a"
                    bg={cancelButtonBg}
                    color="gray.900"
                    _hover={{ bgColor: 'gray.200' }}
                  >
                    Cancelar
                  </Button>
                </Link>
                <Button
                  px="8"
                  type="submit"
                  bg="blue.700"
                  color="gray.50"
                  _hover={{ bgColor: 'blue.900' }}
                  isLoading={creationLoading}
                >
                  Criar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
