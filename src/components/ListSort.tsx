import { HStack, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { SortCard } from './Card/ChangeOrder';

import { IEnterprise } from '../types/IEnterprise';

import { useEnterpriseContext } from '../contexts/EnterprisesContext';

export default function ListSort() {
  const { enterprises } = useEnterpriseContext();

  function handleChangeEnterpriseDisplayOrder() {
    // mudar a ordem de exibição, controlada pela prop
    // displayOrder
    // behavior:
    // troca o valor da displayOrder pelo valor selecionado
    // pega o valor da displayOrder atual e seta no elemento trocado
  }

  useEffect(() => {}, []);

  return (
    <HStack spacing="6" my="4">
      <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
        {enterprises.map((project, index) => (
          <SortCard key={index} enterprise={project} />
        ))}
      </SimpleGrid>
    </HStack>
  );
}
