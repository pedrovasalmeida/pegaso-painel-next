import {
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TiPlus } from 'react-icons/ti';

interface DetailsModalProps {
  showOnlyDetailsButton: boolean;
}

export function DetailsModal({ showOnlyDetailsButton }: DetailsModalProps) {
  const id = 'ID_DA_OBRA';
  const { isOpen, onClose, onOpen } = useDisclosure();
  const color = useColorModeValue('gray.900', 'gray.50');
  const boxBgColor = useColorModeValue('gray.100', 'gray.700');

  const router = useRouter();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  function handleManageImages(id: string) {
    router.push(`/obras/images/${id}`);
  }

  return (
    <>
      <Button
        w="100%"
        mt={showOnlyDetailsButton ? 'auto' : '2'}
        bg="blue.700"
        color="gray.50"
        _hover={{ bgColor: 'blue.900' }}
        onClick={onOpen}
      >
        <Icon as={TiPlus} mr="2" fontSize="16" />
        Detalhes
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes da obra</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
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
              <Divider />
              <Text my="1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus ducimus, vitae ratione repellat eos, porro
                repellendus maxime facilis dolor tenetur nemo magni provident?
              </Text>
              <Divider />
              <Text my="1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Text>
              <Divider />
              <Text my="1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Text>
              <Divider />
              <Text my="1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="blue.700"
              _hover={{ bg: 'blue.900' }}
              color="gray.50"
              mr="2"
              onClick={() => handleManageImages(id)}
            >
              Gerenciar Imagens
            </Button>
            <Button
              bg="blue.700"
              _hover={{ bg: 'blue.900' }}
              color="gray.50"
              onClick={onClose}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
