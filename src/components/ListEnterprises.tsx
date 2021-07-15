import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useEnterpriseContext } from '../contexts/EnterprisesContext';
import { api } from '../services/api';
import { IEnterprise } from '../types/Enterprise';

import { Card } from './Card';
import { CardSkeleton } from './Skeletons/CardSkeleton';

interface ListEnterprisesProps {
  projectsToList?: Array<any>;
  isOnlyRemoveBox?: boolean;
  showDetailsButton?: boolean;
  showOnlyDetailsButton?: boolean;
  showImagesButton?: boolean;
  enterprises: IEnterprise[];
}

export default function ListEnterprises({
  projectsToList = [],
  showDetailsButton = false,
  showOnlyDetailsButton = false,
  isOnlyRemoveBox = false,
  showImagesButton = false,
  enterprises,
}: ListEnterprisesProps) {
  const { loadingEnterprisesData } = useEnterpriseContext();
  const router = useRouter();

  if (enterprises?.length === 0) {
    if (!loadingEnterprisesData) {
      return <Text>Não existem obras</Text>;
    }

    return (
      <HStack w="100%" spacing="6" my="4">
        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <Flex key={index} bg="gray.500" borderRadius="4">
              <CardSkeleton />
            </Flex>
          ))}
        </SimpleGrid>
      </HStack>
    );
  }

  return (
    <Flex flexWrap="wrap" w="100%" mt="4">
      {enterprises.map((project, index) => (
        <Card
          key={project.id}
          isOnlyRemoveBox={isOnlyRemoveBox}
          showDetailsButton={showDetailsButton}
          showOnlyDetailsButton={showOnlyDetailsButton}
          showImagesButton={showImagesButton}
          project={project}
        />
      ))}
    </Flex>
  );
}
