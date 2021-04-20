import { extendTheme, useColorModeValue } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#182024',
      '800': '#1f2629',
      '700': '#364247',
      '600': '#4b5c63',
      '500': '#617680',
      '400': '#79919c',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2',
    },
    blue: {
      '900': '#1a485c',
      '800': '#295263',
      '700': '#0e6387',
      '600': '#2a88b0',
      '500': '#32a0cf',
      '400': '#41b1e0',
      '300': '#61c3ed',
      '200': '#8fd5f2',
      '100': '#bce6f7',
      '50': '#e8f6fc',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
        color: props.colorMode === 'light' ? 'gray.900' : 'gray.50',
      },
    }),
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});
