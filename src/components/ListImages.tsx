import { HStack, SimpleGrid } from '@chakra-ui/react';

import { ImagesCard } from './Card/Images';

interface ListEnterprisesProps {
  projectsToList: Array<any>;
  isOnlyRemoveBox?: boolean;
  showDetailsButton?: boolean;
  showOnlyDetailsButton?: boolean;
}

export default function ListEnterprises({
  projectsToList,
  showDetailsButton = false,
  showOnlyDetailsButton = false,
  isOnlyRemoveBox = false,
}: ListEnterprisesProps) {
  return (
    <HStack spacing="6" my="4">
      <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
        {projectsToList?.map((project, index) => (
          <ImagesCard
            key={index}
            isOnlyRemoveBox={isOnlyRemoveBox}
            showDetailsButton={showDetailsButton}
            showOnlyDetailsButton={showOnlyDetailsButton}
          />
        ))}
      </SimpleGrid>
    </HStack>
  );
}
