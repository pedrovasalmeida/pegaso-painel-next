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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { RiCloseLine } from 'react-icons/ri';

export function RemoveModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  async function handleRemoveEnterprise() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Obra removida.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    setLoading(false);

    await new Promise((resolve) => setTimeout(resolve, 500));

    onClose();
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
          <ModalHeader>Remover obra</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1">Tem certeza que deseja remover essa obra?</Text>
            <Text fontSize="xl" fontWeight="bold" my="1">
              Nome da obra aqui
            </Text>
            <Text mt="1">Essa ação é irreversível.</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="red.700"
              _hover={{ bg: 'red.800' }}
              mr="2"
              onClick={handleRemoveEnterprise}
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
