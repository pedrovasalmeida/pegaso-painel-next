import { Flex, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { SortCard } from './Card/ChangeOrder';

import { IEnterprise } from '../types/IEnterprise';

import { useEnterpriseContext } from '../contexts/EnterprisesContext';

interface ListSortProps {
  projectsToList?: IEnterprise[];
}

export default function ListSort() {
  const { enterprises } = useEnterpriseContext();

  function handleChangeEnterpriseDisplayOrder() {
    console.log('função');
    /**
     * Comportamento:
     * - Será controlado por setas ↓ ↑
     * - Segurar a seta joga ao topo / fundo
     */
  }

  useEffect(() => {}, []);

  return (
    <VStack spacing="6">
      {/* <SimpleGrid minChildWidth="100%" spacing={['6', '8']} w="100%"> */}

      {enterprises.map((enterprise) => (
        <SortCard key={enterprise.id} enterprise={enterprise} />
      ))}

      {/* </SimpleGrid> */}
    </VStack>
  );
}
