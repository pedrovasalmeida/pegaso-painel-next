import { useState } from 'react';
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  toast,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { RiCloseLine } from 'react-icons/ri';

interface RemoveImageModalProps {
  removeAllImages?: boolean;
  fullWidth?: boolean;
}

export function RemoveImageModal({
  removeAllImages = false,
  fullWidth = false,
}: RemoveImageModalProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  async function handleRemoveImages() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Imagem removida.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    setLoading(false);

    await new Promise((resolve) => setTimeout(resolve, 500));

    onClose();
  }

  async function handleRemoveAllImages() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Todas as imagens foram removidas.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    setLoading(false);

    await new Promise((resolve) => setTimeout(resolve, 500));

    onClose();
  }

  if (removeAllImages) {
    return (
      <>
        <Button
          my="auto"
          ml="auto"
          bg="red.700"
          color="gray.50"
          _hover={{ bgColor: 'red.800' }}
          size="md"
          fontSize="sm"
          width={fullWidth ? '100%' : '180px'}
          onClick={onOpen}
          px="8"
        >
          <Icon as={RiCloseLine} mr="1" fontSize="16" />
          Remover tudo
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Remover imagens</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Tem certeza que deseja remover todas as imagens?</Text>
              <Text>Essa ação é irreversível.</Text>
            </ModalBody>

            <ModalFooter>
              <Button
                bg="red.700"
                _hover={{ bg: 'red.800' }}
                mr="2"
                onClick={handleRemoveAllImages}
                color="gray.50"
                isLoading={loading}
              >
                Confirmar
              </Button>
              <Button
                bg="blue.700"
                _hover={{ bg: 'blue.900' }}
                mr="2"
                onClick={onClose}
                color="gray.50"
                disabled={loading}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Button
        w="100%"
        bg="blue.700"
        color="gray.50"
        _hover={{ bgColor: 'red.800' }}
        onClick={onOpen}
      >
        <Icon as={RiCloseLine} mr="1" fontSize="16" />
        Remover
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remover imagem</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Tem certeza que deseja remover essa imagem?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="red.700"
              _hover={{ bg: 'red.800' }}
              mr="2"
              onClick={handleRemoveImages}
              color="gray.50"
              isLoading={loading}
            >
              Confirmar
            </Button>
            <Button
              bg="blue.700"
              _hover={{ bg: 'blue.900' }}
              mr="2"
              onClick={onClose}
              color="gray.50"
              disabled={loading}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
