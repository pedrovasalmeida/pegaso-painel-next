import { useColorModeValue } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Flex, HStack, Text } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { SortEnterprisesModal } from '../Modal/SortEnterprises';

import { IEnterprise } from '../../types/IEnterprise';

interface SortCardProps {
  enterprise: IEnterprise;
}

export function SortCard({ enterprise }: SortCardProps) {
  const color = useColorModeValue('gray.900', 'gray.50');
  const boxBgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex
      direction="column"
      minW="150"
      minH="250"
      bg={boxBgColor}
      borderRadius="8"
      p="4"
    >
      <Image
        src="/images/image.jpeg"
        alt="alguma imagem"
        maxH="150px"
        mb="1"
        borderRadius="8"
        objectFit="cover"
      />
      <Text my="2" fontSize="20" fontWeight="bold">
        {enterprise.name}
      </Text>
      <Text mb="2" fontSize="18">
        {enterprise.displayOrder}º à ser exibido
      </Text>
      <HStack w="100%" mt="auto">
        <SortEnterprisesModal />
      </HStack>
    </Flex>
  );
}
