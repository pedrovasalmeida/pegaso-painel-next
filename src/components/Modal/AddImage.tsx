import React, { useEffect, useRef, useState } from 'react';

import {
  Button,
  Flex,
  Icon,
  Input,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';

import { RiImageAddFill, RiSendPlane2Line } from 'react-icons/ri';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface AddImageModalProps {
  fullWidth?: boolean;
  createEnterprisePage?: boolean;
}

export function AddImageModal({
  fullWidth = false,
  createEnterprisePage = false,
}: AddImageModalProps) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const toast = useToast();
  const inputFileRef = useRef(null);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  function handleSelectImagesToUpload() {
    if (inputFileRef?.current.files.length > 0) {
      const newArray: any = [];
      const filesName = files.map((file) => file.name);

      Array.from(inputFileRef.current.files).forEach((file: any, index) => {
        if (!filesName.includes(file.name)) {
          newArray.push(file);
        }
      });

      setFiles([...files, ...newArray]);
    } else {
      setFiles([]);
    }
  }

  async function handleUploadImages() {
    setLoading(true);

    try {
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));

      toast({
        title:
          files.length > 1
            ? `As ${files.length} imagens foram adicionadas.`
            : 'A imagem foi adicionada.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setFiles([]);

      setLoading(false);
    } catch {
      toast({
        title: 'Ocorreu um erro.',
        description: 'Tente novamente.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });

      setLoading(false);
    }
  }

  return (
    <Flex width="100%">
      <Input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleSelectImagesToUpload()}
        width="100px"
        placeholder="Adicionar imagem"
        display="none"
      />
      <Flex width="100%">
        <Button
          my="auto"
          ml="auto"
          bg="blue.700"
          color="gray.50"
          _hover={{ bgColor: 'blue.800' }}
          fontSize={['12', '14']}
          isLoading={loading}
          width={fullWidth ? '50%' : 'auto'}
          onClick={() => inputFileRef?.current.click()}
        >
          <Icon as={RiImageAddFill} mr="1" fontSize="16" />
          {createEnterprisePage ? (
            'Adicionar banner'
          ) : (
            <>
              {files.length <= 0 && 'Adicionar imagens'}
              {files.length === 1 && 'Adicionar 1 imagem'}
              {files.length >= 2 && `Adicionar ${files.length} imagens`}
            </>
          )}
        </Button>

        <Button
          my="auto"
          ml="4"
          bg="blue.700"
          color="gray.50"
          _hover={{ bgColor: 'blue.800' }}
          fontSize="sm"
          width={fullWidth ? '50%' : 'auto'}
          disabled={files.length <= 0}
          isLoading={loading}
          onClick={handleUploadImages}
        >
          <Icon as={RiSendPlane2Line} mr="1" fontSize="16" />
          Enviar
        </Button>
      </Flex>
    </Flex>
  );

  return <></>;
}
