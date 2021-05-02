import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Flex,
  Button,
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
  Text,
  useColorMode,
  IconButton,
  useColorModeValue,
  Image,
  useToast,
  Box,
} from '@chakra-ui/react';

import { Input } from '../components/Form/Input';
import { useRouter } from 'next/router';
import { BsMoon, BsSun } from 'react-icons/bs';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  login: yup.string().required('Login obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;
  const router = useRouter();
  const toast = useToast();

  const color = useColorModeValue('gray.900', 'gray.50');
  const bgColor = useColorModeValue('gray.100', 'gray.800');

  const handleSignIn: SubmitHandler<SignInFormData> = async ({
    email,
    password,
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: 'Credenciais válidas',
      description: 'Entrando...',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push('/dashboard');
  };

  return (
    <>
      <Head>
        <title>Login | Pégaso</title>
      </Head>

      <Flex
        direction="column"
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
      >
        <Image src="/images/pegaso-logo.png" alt="Pégaso" mb="2" />
        <Flex
          align="center"
          justify="center"
          onClick={toggleColorMode}
          cursor="pointer"
          mr="2"
          mb="2"
          borderRadius={8}
          color="whiteAlpha.900"
        >
          <IconButton
            aria-label="Change theme"
            color={color}
            icon={<Icon as={colorMode === 'dark' ? BsMoon : BsSun} />}
            fontSize="16"
            my="auto"
            variant="unstyled"
          />
        </Flex>
        <Text fontSize="lg" mb="4">
          Bem-vindo! Faça login para continuar:
        </Text>

        <Flex
          as="form"
          w="100%"
          maxWidth={360}
          flexDir="column"
          p={8}
          mx="5"
          borderRadius={8}
          bg={bgColor}
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              type="text"
              name="login"
              label="Login"
              error={errors.login}
              {...register('login')}
            />
            <Input
              type="password"
              name="password"
              label="Senha"
              error={errors.password}
              {...register('password')}
            />
          </Stack>
          <Button
            type="submit"
            mt="6"
            bgColor="blue.700"
            _hover={{ bgColor: 'blue.800' }}
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
        <Text mt="4" alignSelf="center">
          Pégaso - 2021 &copy;
        </Text>
      </Flex>
    </>
  );
}
