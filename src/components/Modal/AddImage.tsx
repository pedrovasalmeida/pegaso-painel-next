import {
  Button,
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

interface AddImageModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export function AddImageModal({ isOpen, onClose }: AddImageModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar imagens</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Aqui adiciona imagens à uma obra</Text>
          <Text>Aqui adiciona imagens à uma obra</Text>
          <Text>Aqui adiciona imagens à uma obra</Text>
          <Text>Aqui adiciona imagens à uma obra</Text>
          <Text>Aqui adiciona imagens à uma obra</Text>
          <Text>Aqui adiciona imagens à uma obra</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr="2">
            Salvar modificações
          </Button>
          <Button variant="ghost">Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
