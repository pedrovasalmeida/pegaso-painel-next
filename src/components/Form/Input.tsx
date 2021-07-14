import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  // const boxBgColor = useColorModeValue('gray.200', 'gray.700');
  // const focusBgColor = useColorModeValue('gray.100', 'gray.800');
  // const color = useColorModeValue('gray.900', 'gray.50');
  const inputBgColor = useColorModeValue('gray.50', 'gray.500');
  const boxBgColor = useColorModeValue('gray.200', 'gray.700');
  const placeholderColor = useColorModeValue('gray.800', 'white');

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} fontSize="18">
          {label}
        </FormLabel>
      )}

      <ChakraInput
        id={name}
        name={name}
        type="email"
        _hover={{ bgColor: inputBgColor }}
        focusBorderColor="blue.500"
        _focus={{ bgColor: inputBgColor }}
        _placeholder={{ color: placeholderColor }}
        // _focus={{ bgColor: inputBgColor }}
        bgColor={inputBgColor}
        variant="filled"
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
