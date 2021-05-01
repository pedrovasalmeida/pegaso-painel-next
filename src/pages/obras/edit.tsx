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
  Text,
} from '@chakra-ui/react';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { TextArea } from '../../components/Form/TextArea';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  email: yup
    .string()
    .required('O e-mail é obrigatório')
    .email('Inserir um e-mail válido (qualquer@coisa.com)'),
  password: yup
    .string()
    .required('A senha é obrigatória (como você vai acessar?)')
    .min(6, 'A senha precisa ter, no mínimo, 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export default function UserList() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);

    router.push('/users');
  };

  const boxBgColor = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.900', 'gray.50');
  const cancelButtonBg = useColorModeValue('gray.200', 'gray.400');

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1600} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg={boxBgColor}
          color={color}
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading display="flex" size="lg" fontWeight="normal">
            Editar dados da obra
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
              error={errors.email}
              {...register('description')}
            />
            {/* </SimpleGrid> */}
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="mini-description"
                type="text"
                label="Descrição curta"
                error={errors.password}
                {...register('mini-description')}
              />
              <Input
                name="adress"
                type="text"
                label="Endereço"
                error={errors.password}
                {...register('adress')}
              />
            </SimpleGrid>
            <Input
              name="banner"
              type="text"
              label="Link do banner"
              error={errors.password}
              {...register('banner')}
            />
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/obras" passHref>
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
                isLoading={formState.isSubmitting}
              >
                Criar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
