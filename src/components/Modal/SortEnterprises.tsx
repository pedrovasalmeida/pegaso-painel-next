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

export function SortEnterprisesModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

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
        Mudar ordem
      </Button>
    </>
  );
}
