import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { EnterprisesProvider } from '../contexts/EnterprisesContext';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { theme } from '../styles/theme';
import { queryClient } from '../services/queryClient';

import firebase from '../database/initFirebase';
import { AuthProvider } from '../contexts/AuthContext';
import NextNprogress from 'nextjs-progressbar';

firebase();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress
        color="#2a88b0"
        startPosition={0.6}
        stopDelayMs={600}
        height={3}
        showOnShallow={true}
      />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SidebarDrawerProvider>
            <ChakraProvider theme={theme}>
              <EnterprisesProvider>
                <Component {...pageProps} />
              </EnterprisesProvider>
            </ChakraProvider>
          </SidebarDrawerProvider>
        </AuthProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
