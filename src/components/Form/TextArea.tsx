import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import {
  Textarea as ChakraInput,
  FormLabel,
  FormControl,
  TextareaProps as ChakraInputProps,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const TextAreaBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  const boxBgColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraInput
        id={name}
        name={name}
        type="email"
        focusBorderColor="blue.700"
        bgColor={boxBgColor}
        variant="filled"
        size="lg"
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const TextArea = forwardRef(TextAreaBase);
