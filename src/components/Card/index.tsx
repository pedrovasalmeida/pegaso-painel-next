import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Flex, HStack, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { RiImageAddLine } from 'react-icons/ri';
import { IFinalEnterprise } from '../../types/IEnterprise';
import { DetailsModal } from '../Modal/Details';
import { EditEnterpriseModal } from '../Modal/EditEnterprise';
import { RemoveModal } from '../Modal/Remove';

interface CardProps {
  project: IFinalEnterprise;
  isOnlyRemoveBox?: boolean;
  showDetailsButton?: boolean;
  showOnlyDetailsButton?: boolean;
  showImagesButton?: boolean;
}

export function Card({
  project,
  isOnlyRemoveBox = false,
  showOnlyDetailsButton = false,
  showDetailsButton = false,
  showImagesButton = false,
}: CardProps) {
  const id = 'ID_DA_OBRA';
  const color = useColorModeValue('gray.900', 'gray.50');
  const boxBgColor = useColorModeValue('gray.100', 'gray.700');

  const router = useRouter();

  function handleManageImages(id: string) {
    router.push(`/obras/images/${id}`);
  }

  return (
    <Flex
      direction="column"
      minH="250"
      maxW="500px"
      bg={boxBgColor}
      borderRadius="8"
      p="4"
    >
      <Image
        src={project.banner}
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
        {project.name}
      </Text>
      <Text my="1" isTruncated>
        {project.description}
      </Text>
      {!showOnlyDetailsButton && (
        <HStack w="100%" mt="2">
          {!isOnlyRemoveBox && <EditEnterpriseModal project={project} />}
          <RemoveModal project={project} />
        </HStack>
      )}

      {showDetailsButton && (
        <DetailsModal
          project={project}
          showOnlyDetailsButton={showOnlyDetailsButton}
        />
      )}

      {showImagesButton && (
        <Button
          mt="2"
          w="100%"
          bg="blue.700"
          color="gray.50"
          _hover={{ bgColor: 'blue.800' }}
          onClick={() => handleManageImages(id)}
        >
          <Icon as={RiImageAddLine} mr="1" fontSize="16" />
          Gerenciar imagens
        </Button>
      )}
    </Flex>
  );
}
