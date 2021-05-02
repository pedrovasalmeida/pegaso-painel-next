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
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import { RiEditLine } from 'react-icons/ri';

import { EditEnterpriseForm } from '../EditEnterpriseForm';

export function EditEnterpriseModal() {
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  async function handleSaveEdit() {
    setIsSaveLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSaveLoading(false);

    toast({
      title: 'Alterações salvas.',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-left',
    });

    onClose();
  }

  return (
    <>
      <Button
        w="100%"
        bg="blue.700"
        color="gray.50"
        _hover={{ bgColor: 'blue.900' }}
        onClick={onOpen}
      >
        <Icon as={RiEditLine} mr="2" fontSize="16" />
        Editar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar obra</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditEnterpriseForm />
          </ModalBody>

          <ModalFooter>
            <Button
              bg="blue.700"
              _hover={{ bg: 'blue.900' }}
              mr="2"
              color="gray.50"
              onClick={handleSaveEdit}
              isLoading={isSaveLoading}
            >
              Salvar alterações
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
