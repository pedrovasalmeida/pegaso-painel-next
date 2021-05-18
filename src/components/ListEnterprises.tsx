import { HStack, SimpleGrid } from '@chakra-ui/react';

import { Card } from './Card';

interface ListEnterprisesProps {
  projectsToList: Array<any>;
  isOnlyRemoveBox?: boolean;
  showDetailsButton?: boolean;
  showOnlyDetailsButton?: boolean;
  showImagesButton?: boolean;
}

export default function ListEnterprises({
  projectsToList,
  showDetailsButton = false,
  showOnlyDetailsButton = false,
  isOnlyRemoveBox = false,
  showImagesButton = false,
}: ListEnterprisesProps) {
  return (
    <HStack spacing="6" my="4">
      <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
        {projectsToList.map((project, index) => (
          <Card
            key={index}
            isOnlyRemoveBox={isOnlyRemoveBox}
            showDetailsButton={showDetailsButton}
            showOnlyDetailsButton={showOnlyDetailsButton}
            showImagesButton={showImagesButton}
          />
        ))}
      </SimpleGrid>
    </HStack>
  );
}
