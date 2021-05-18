import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useForm, SubmitHandler } from 'react-hook-form';

import {
  Box,
  SimpleGrid,
  VStack,
  useColorModeValue,
  Image,
  Text,
  Button,
} from '@chakra-ui/react';

import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { Dispatch, SetStateAction } from 'react';

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

export function AddImageForm() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // router.push('/users');
  };

  const boxBgColor = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.900', 'gray.50');
  const inputBgColor = useColorModeValue('gray.100', 'gray.800');
  const buttonBgColor = useColorModeValue('blue.700', 'gray.600');
  const buttonHoverColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Box
      as="form"
      flex="1"
      borderRadius={8}
      color={color}
      onSubmit={handleSubmit(handleCreateUser)}
    >
      <VStack spacing="8" color={color}>
        <Input
          name="nome"
          label="Insira o link da sua imagem"
          {...register('name')}
          type="text"
          error={errors.name}
          bgColor={inputBgColor}
          _hover={{ bgColor: inputBgColor }}
          _focus={{ bgColor: inputBgColor }}
        />
        <Text>OU</Text>
        <Button
          w="100%"
          py="6"
          bgColor="blue.700"
          _hover={{ bgColor: 'blue.800' }}
        >
          Envie sua imagem
        </Button>
      </VStack>
    </Box>
  );
}
