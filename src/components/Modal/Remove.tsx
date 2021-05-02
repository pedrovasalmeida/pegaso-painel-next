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
  useDisclosure,
} from '@chakra-ui/react';
import { RiCloseLine } from 'react-icons/ri';

export function RemoveModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();

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
            <Text>Tem certeza que deseja remover essa obra?</Text>
            <Text fontSize="xl" fontWeight="bold">
              Nome da obra aqui
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="red.700"
              _hover={{ bg: 'red.800' }}
              mr="2"
              onClick={() => {}}
              color="gray.50"
            >
              Confirmar
            </Button>
            <Button
              bg="blue.700"
              _hover={{ bg: 'blue.900' }}
              mr="2"
              onClick={onClose}
              color="gray.50"
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
