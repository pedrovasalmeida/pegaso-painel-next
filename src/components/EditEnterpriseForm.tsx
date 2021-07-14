import {
  Box,
  SimpleGrid,
  VStack,
  useColorModeValue,
  Image,
  Text,
  Button,
  Flex,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';

import { Input } from './Form/Input';
import { TextArea } from './Form/TextArea';
import { LegacyRef, useRef, useState } from 'react';
import { IEnterprise } from '../types/Enterprise';
import { DetailsModal } from './Modal/Details';
import { api } from '../services/api';
import { InputProps } from '@chakra-ui/core';

interface EditEnterpriseFormProps {
  project: IEnterprise;
  onClose: () => void;
}

export function EditEnterpriseForm({
  project,
  onClose,
}: EditEnterpriseFormProps) {
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [edittedEnterprise, setEdditedEnterprise] =
    useState<IEnterprise | null>(null);

  const color = useColorModeValue('gray.900', 'gray.50');
  const inputBgColor = useColorModeValue('gray.100', 'gray.800');

  const toast = useToast();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const shortDescriptionRef = useRef(null);
  const addressRef = useRef(null);
  const bannerRef = useRef(null);

  // async function handleSaveEdit() {
  //   setIsSaveLoading(true);

  //   try {
  //     const edittedEnterpriseData: IEnterprise = {
  //       id: project.id,
  //       name: nameRef.current?.value || project.name,
  //       description: descriptionRef.current?.value || project.description,
  //       shortDescription:
  //         shortDescriptionRef.current?.value || project.shortDescription,
  //       address: addressRef.current?.value || project.address,
  //       banner: bannerRef.current?.value || project.banner,
  //       displayOrder: project.displayOrder,
  //       images: project.images,
  //       createdAt: project.createdAt,
  //       updatedAt: new Date().toLocaleDateString('pt-BR', {
  //         day: '2-digit',
  //         month: 'numeric',
  //         year: 'numeric',
  //       }),
  //     };

  //     await api.post('editEnterprise', edittedEnterpriseData);

  //     toast({
  //       title: 'Alterações salvas.',
  //       status: 'success',
  //       duration: 2000,
  //       isClosable: true,
  //       position: 'top-left',
  //     });

  //     setIsSaveLoading(false);
  //     onClose();

  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 1000);
  //   } catch (err) {
  //     toast({
  //       title: 'Não foi possível salvar as alterações',
  //       status: 'error',
  //       duration: 2000,
  //       isClosable: true,
  //       position: 'top-left',
  //     });

  //     setIsSaveLoading(false);
  //   }
  // }

  function handleSaveEdit() {
    // console.log
    return;
  }

  return (
    <Box as="form" flex="1" borderRadius={8} color={color}>
      <Image
        src={project.banner}
        alt="alguma imagem"
        width="100%"
        maxH="150px"
        mb="4"
        borderRadius="8"
        objectFit="cover"
      />
      <VStack spacing="8" color={color}>
        <DetailsModal
          project={project}
          showOnlyDetailsButton
          textFromDetailsButton="Clique aqui para ver os dados da obra."
        />
        <Input
          placeholder={project.name}
          name="nome"
          label="Nome da obra"
          type="text"
          bgColor={inputBgColor}
          ref={nameRef}
        />
        <TextArea
          ref={descriptionRef}
          name="description"
          label="Descrição da obra"
          placeholder={project.description}
          bgColor={inputBgColor}
        />
        {/* </SimpleGrid> */}
        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            ref={shortDescriptionRef}
            name="mini-description"
            type="text"
            label="Descrição curta"
            placeholder={project.shortDescription}
            bgColor={inputBgColor}
          />
          <Input
            ref={addressRef}
            name="adress"
            type="text"
            label="Endereço"
            placeholder={project.address}
            bgColor={inputBgColor}
          />
        </SimpleGrid>
        <Input
          ref={bannerRef}
          name="banner"
          type="text"
          placeholder={project.banner}
          label="Link do banner"
          bgColor={inputBgColor}
        />
      </VStack>
      <Flex justify="flex-end" my="4" mt="6">
        <Button
          bg="blue.700"
          _hover={{ bg: 'blue.900' }}
          mr="2"
          color="gray.50"
          isLoading={isSaveLoading}
          onClick={handleSaveEdit}
        >
          Salvar alterações
        </Button>
        <Button variant="ghost" onClick={onClose} disabled={isSaveLoading}>
          Cancelar
        </Button>
      </Flex>
    </Box>
  );
}
