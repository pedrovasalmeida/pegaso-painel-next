import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    blue: {
      '900': '#042330',
      '800': '#063447',
      '700': '#09455e',
      '600': '#0e6387',
      '500': '#0f6e96',
      '400': '#4b839c',
      '300': '#78a1b3',
      '200': '#97b7c4',
      '100': '#b8cfd9',
      '50': '#e6eff2',
    },
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'blue.50',
      },
    },
  },
});
