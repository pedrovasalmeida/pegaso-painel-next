import { useColorModeValue } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Flex, HStack, Text } from '@chakra-ui/layout';
import { DetailsModal } from '../Modal/Details';
import { EditEnterpriseModal } from '../Modal/EditEnterprise';
import { RemoveModal } from '../Modal/Remove';

interface CardProps {
  isOnlyRemoveBox?: boolean;
  showDetailsButton?: boolean;
  showOnlyDetailsButton?: boolean;
  editFunction?: () => void;
  removeFunction?: () => void;
}

export function Card({
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
      <Text
        color={color}
        fontWeight="bold"
        fontSize="20"
        mr="auto"
        my="1"
        isTruncated
      >
        Título da obra aqui
      </Text>
      <Text my="1" isTruncated>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        ducimus, vitae ratione repellat eos, porro repellendus maxime facilis
        dolor tenetur nemo magni provident?
      </Text>
      {!showOnlyDetailsButton && (
        <HStack w="100%" mt="2">
          {!isOnlyRemoveBox && <EditEnterpriseModal />}
          <RemoveModal />
        </HStack>
      )}

      {showDetailsButton && (
        <DetailsModal showOnlyDetailsButton={showOnlyDetailsButton} />
      )}

      <>{/* <AddImageModal isOpen={isOpen} onClose={onClose} /> */}</>
    </Flex>
  );
}
