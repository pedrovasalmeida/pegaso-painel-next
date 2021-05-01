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
} from '@chakra-ui/react';

import { Input } from '../components/Form/Input';
import { useRouter } from 'next/router';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  login: yup.string().required('Login obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const router = useRouter();

  const handleSignIn: SubmitHandler<SignInFormData> = async ({
    email,
    password,
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
        <Text color="whiteAlpha.800" fontSize="lg" mb="4">
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
          bg="gray.800"
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
        <Text color="whiteAlpha.800" mt="4" alignSelf="center">
          Pégaso - 2021 &copy;
        </Text>
      </Flex>
    </>
  );
}
