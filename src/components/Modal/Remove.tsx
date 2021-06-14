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
import { IFinalEnterprise } from '../../types/IEnterprise';
import { api } from '../../services/api';
import { useRouter } from 'next/router';
import { deleteEnterprise } from '../../hooks/deleteEnterprise';
import { getEnterprises } from '../../hooks/getEnterprises';
import { fixDisplayOrders } from '../../hooks/fixDisplayOrders';
import { saveEnterpriseOrderChanges } from '../../hooks/saveChangesEnterpriseOrder';

interface RemoveModalProps {
  project: IFinalEnterprise;
}

export function RemoveModal({ project }: RemoveModalProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const toast = useToast();

  async function handleRemoveEnterprise() {
    setLoading(true);

    const isEnterpriseDeleted = await deleteEnterprise({ id: project.id });

    if (!isEnterpriseDeleted) {
      toast({
        title: 'Ocorreu um erro ao remover a obra.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });

      setLoading(false);

      return;
    }

    const oldEnterprises = await getEnterprises();

    const fixedEnterprises = fixDisplayOrders({ enterprises: oldEnterprises });

    await saveEnterpriseOrderChanges({ enterprises: fixedEnterprises });

    toast({
      title: 'Obra removida.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    setLoading(false);

    setTimeout(() => {
      router.reload();
    }, 500);

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
            <Text mb="1">
              Tem certeza que deseja remover <strong>{project.name}</strong>?
            </Text>
            <Text mt="1">Essa ação é irreversível.</Text>
            <Text mt="2" fontSize="10" fontWeight="normal">
              ID da obra: {project.id}
            </Text>
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
