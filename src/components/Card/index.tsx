import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Flex, HStack, Text } from '@chakra-ui/layout';
import { RiCloseLine, RiEditLine } from 'react-icons/ri';
import { TiPlus } from 'react-icons/ti';

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
  removeFunction,
  editFunction,
}: CardProps) {
  const color = useColorModeValue('gray.900', 'gray.50');
  const boxBgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex
      direction="column"
      minW="150"
      minH="250"
      bg={boxBgColor}
      borderRadius="12"
      p="4"
    >
      <Image src="/images/image.jpeg" alt="alguma imagem" maxH="100px" mb="1" />
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
          {!isOnlyRemoveBox && (
            <Button
              w="100%"
              bg="blue.700"
              color="gray.50"
              _hover={{ bgColor: 'blue.900' }}
              onClick={editFunction}
            >
              <Icon as={RiEditLine} mr="2" fontSize="16" />
              Editar
            </Button>
          )}
          <Button
            w="100%"
            bg="blue.700"
            color="gray.50"
            _hover={{ bgColor: 'red.800' }}
            onClick={removeFunction}
          >
            <Icon as={RiCloseLine} mr="1" fontSize="16" />
            Remover
          </Button>
        </HStack>
      )}

      {showDetailsButton && (
        <Button
          w="100%"
          mt={showOnlyDetailsButton ? 'auto' : '2'}
          bg="blue.700"
          color="gray.50"
          _hover={{ bgColor: 'blue.900' }}
          onClick={editFunction}
        >
          <Icon as={TiPlus} mr="2" fontSize="16" />
          Detalhes
        </Button>
      )}
    </Flex>
  );
}
