import { useColorModeValue } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Flex, HStack, Text } from '@chakra-ui/layout';
import { DetailsModal } from '../Modal/Details';
import { EditEnterpriseModal } from '../Modal/EditEnterprise';
import { RemoveModal } from '../Modal/Remove';
import { RemoveImageModal } from '../Modal/RemoveImage';

interface CardProps {
  isOnlyRemoveBox?: boolean;
  showDetailsButton?: boolean;
  showOnlyDetailsButton?: boolean;
  editFunction?: () => void;
  removeFunction?: () => void;
}

export function ImagesCard({
  isOnlyRemoveBox = false,
  showOnlyDetailsButton = false,
  showDetailsButton = false,
}: CardProps) {
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
      {!showOnlyDetailsButton && (
        <HStack w="100%" mt="auto">
          <RemoveImageModal />
        </HStack>
      )}
    </Flex>
  );
}
