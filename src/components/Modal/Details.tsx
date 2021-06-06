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
import { useEnterpriseContext } from '../../contexts/EnterprisesContext';
import { IFinalEnterprise } from '../../types/IEnterprise';

interface DetailsModalProps {
  project: IFinalEnterprise;
  showOnlyDetailsButton?: boolean;
  textFromDetailsButton?: string | null;
}

export function DetailsModal({
  showOnlyDetailsButton = false,
  project,
  textFromDetailsButton = null,
}: DetailsModalProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { setSingleEnterpriseData } = useEnterpriseContext();
  const color = useColorModeValue('gray.900', 'gray.50');
  const boxBgColor = useColorModeValue('gray.100', 'gray.700');
  const imagesLength = project.images.length;

  const router = useRouter();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  function handleManageImages(id: string) {
    if (!project) {
      return;
    }

    setSingleEnterpriseData(project);
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
        {textFromDetailsButton || 'Detalhes'}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes da obra</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <Image
                src={project.banner}
                alt="Banner"
                maxH="150px"
                mb="1"
                borderRadius="8"
                objectFit="cover"
              />
              <Text display="flex" my="1">
                <a
                  href={project.banner}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Text color="blue.700">
                    {' '}
                    Clique aqui para obter o link do banner
                  </Text>
                </a>
              </Text>
              <Text
                color={color}
                fontWeight="bold"
                fontSize="20"
                mr="auto"
                my="1"
                isTruncated
              >
                {project.name}
              </Text>
              <Divider my="1" />
              <Text my="1">{project.description}</Text>
              <Divider my="1" />
              <Text my="1">{project.address}</Text>
              <Divider my="1" />
              <Text my="1">Criado em {project.createdAt}</Text>
              {project.createdAt !== project.updatedAt && (
                <Text my="1">Atualizado em {project.updatedAt}</Text>
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="blue.700"
              _hover={{ bg: 'blue.900' }}
              color="gray.50"
              mr="2"
              onClick={() => handleManageImages(project.id)}
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
