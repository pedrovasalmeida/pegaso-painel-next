import { ReactNode } from 'react';
import { Box, Text, Stack } from '@chakra-ui/react';

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <Text fontWeight="bold" fontSize="small" color="gray.400">
        {title}
      </Text>
      <Stack spacing="4" mt="4" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
