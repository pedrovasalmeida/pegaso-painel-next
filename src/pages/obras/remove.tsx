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
  Stack,
} from '@chakra-ui/react';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { TextArea } from '../../components/Form/TextArea';
import { Card } from '../../components/Card';
import ListEnterprises from '../../components/ListEnterprises';

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
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const router = useRouter();

  const boxBgColor = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.900', 'gray.50');
  const cancelButtonBg = useColorModeValue('gray.200', 'gray.400');

  return (
    <Box>
      <Header />

      <Box display="flex" w="100%" my="6" maxWidth={1600} mx="auto" px="6">
        <Sidebar />

        <Flex direction="column" w="90%">
          <Heading h="10">Remover obras:</Heading>

          <ListEnterprises projectsToList={cards} isOnlyRemoveBox />
        </Flex>
      </Box>
    </Box>
  );
}
