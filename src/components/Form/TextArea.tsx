import {
  forwardRef,
  ForwardRefRenderFunction,
  TextareaHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

import {
  Textarea as ChakraTextarea,
  FormLabel,
  FormControl,
  TextareaProps as ChakraTextareaProps,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';

interface TextareaProps extends ChakraTextareaProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const TextAreaBase: ForwardRefRenderFunction<HTMLInputElement, TextareaProps> =
  ({ name, label, error = null, ...rest }, ref) => {
    const boxBgColor = useColorModeValue('gray.200', 'gray.700');
    const focusBgColor = useColorModeValue('gray.100', 'gray.800');
    const color = useColorModeValue('gray.900', 'gray.50');

    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

        <ChakraTextarea
          id={name}
          name={name}
          type="text"
          focusBorderColor="blue.500"
          _placeholder={{ color }}
          _focus={{ bgColor: focusBgColor }}
          bgColor={boxBgColor}
          variant="filled"
          size="lg"
          ref={ref}
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  };

export const TextArea = forwardRef(TextAreaBase);
