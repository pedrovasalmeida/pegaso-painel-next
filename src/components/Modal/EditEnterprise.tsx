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
import { ClassNames } from '@emotion/react';
import { useState } from 'react';

import { RiEditLine } from 'react-icons/ri';
import { IFinalEnterprise } from '../../types/IEnterprise';

import { EditEnterpriseForm } from '../EditEnterpriseForm';

interface EditEnterpriseModalProps {
  project: IFinalEnterprise;
}

export function EditEnterpriseModal({ project }: EditEnterpriseModalProps) {
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

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
            <EditEnterpriseForm project={project} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
