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
} from '@chakra-ui/react';

import { Input } from './Form/Input';
import { TextArea } from './Form/TextArea';
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

export function EditEnterpriseForm() {
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

  return (
    <Box
      as="form"
      flex="1"
      borderRadius={8}
      color={color}
      onSubmit={handleSubmit(handleCreateUser)}
    >
      <Image
        src="/images/image.jpeg"
        alt="alguma imagem"
        width="100%"
        maxH="150px"
        mb="4"
        borderRadius="8"
        objectFit="cover"
      />
      <VStack spacing="8" color={color}>
        <Input
          name="nome"
          label="Nome da obra"
          {...register('name')}
          type="text"
          error={errors.name}
          bgColor={inputBgColor}
        />
        <TextArea
          name="description"
          label="Descrição da obra"
          error={errors.email}
          {...register('description')}
          bgColor={inputBgColor}
        />
        {/* </SimpleGrid> */}
        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            name="mini-description"
            type="text"
            label="Descrição curta"
            error={errors.password}
            {...register('mini-description')}
            bgColor={inputBgColor}
          />
          <Input
            name="adress"
            type="text"
            label="Endereço"
            error={errors.password}
            {...register('adress')}
            bgColor={inputBgColor}
          />
        </SimpleGrid>
        <Input
          name="banner"
          type="text"
          label="Link do banner"
          error={errors.password}
          {...register('banner')}
          bgColor={inputBgColor}
        />
      </VStack>
    </Box>
  );
}
