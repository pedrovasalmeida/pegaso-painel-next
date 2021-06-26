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

import { useAuth } from '../contexts/AuthContext';

import { Input } from '../components/Form/Input';
import { useRouter } from 'next/router';
import { BsMoon, BsSun } from 'react-icons/bs';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { IUser } from '../types/IEnterprise';
import { useState } from 'react';
import { validateUser } from '../hooks/validateUser';
import { useCan } from '../hooks/useValidate';

type SignInFormData = {
  login: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  login: yup.string().required('Login obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { signIn } = useAuth();

  const { colorMode, toggleColorMode } = useColorMode();
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;
  const toast = useToast();

  const color = useColorModeValue('gray.900', 'gray.50');
  const bgColor = useColorModeValue('gray.100', 'gray.800');

  const handleSignIn: SubmitHandler<SignInFormData> = async ({
    login,
    password,
  }) => {
    setIsLoading(true);

    try {
      await signIn({ email: login, password });

      toast({
        title: `Login efetuado.`,
        description: 'Entrando...',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });

      setIsLoading(false);
    } catch {
      toast({
        title: `Credenciais inválidas.`,
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Pégaso | Login</title>
      </Head>

      <Flex
        direction="column"
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
      >
        <Image
          src="/images/pegaso-logo.png"
          alt="Logo - Pégaso"
          mb="2"
          pointerEvents="none"
        />
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
          <Text width="100px" color={color}>
            Modo {colorMode === 'dark' ? 'escuro' : 'claro'}
          </Text>
        </Flex>
        {/* <Text fontSize="lg" mb="4">
          Bem-vindo! Faça login para continuar:
        </Text> */}

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
            color="gray.50"
            _hover={{ bgColor: 'blue.800' }}
            size="lg"
            isLoading={isLoading}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserValid = await useCan({ ctx });

  if (isUserValid) {
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
