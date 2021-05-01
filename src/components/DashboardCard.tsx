import { Box, Text } from '@chakra-ui/layout';
import { ReactNode } from 'react';

interface DashboardCardProps {
  children: ReactNode;
}

export function DashboardCard({ children }: DashboardCardProps) {
  return (
    <Box
      p="8"
      bg="gray.800"
      borderRadius={8}
      pb="4"
      minWidth="180px"
      maxWidth="250px"
      maxHeight="100px"
    >
      <Text fontSize="large" mb="4">
        {children}
      </Text>
    </Box>
  );
}
