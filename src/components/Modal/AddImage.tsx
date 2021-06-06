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

import firebase from 'firebase/app';
import 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { api } from '../../services/api';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface AddImageModalProps {
  fullWidth?: boolean;
  createEnterprisePage?: boolean;
  singleFile?: boolean;
  inputRef?: any;
  documentId?: string;
}

interface ImagesProps {
  id: string;
  link: string;
}

export function AddImageModal({
  fullWidth = false,
  createEnterprisePage = false,
  singleFile = false,
  inputRef = null,
  documentId = null,
}: AddImageModalProps) {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadImage] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [imagesUploaded, setImagesUploaded] = useState<ImagesProps[]>([]);

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
    setUploadImage(true);
    try {
      if (!singleFile) {
        const storageRef = firebase.storage().ref();

        files.forEach(async (file, index) => {
          const name = `${uuid()}-${file.name}`;
          const metadata = {
            contentType: file.type,
          };
          const task = storageRef.child(name).put(file, metadata);
          task
            .then((snapshop) => {
              return snapshop.ref.getDownloadURL();
            })
            .then((url) => {
              setImagesUploaded([...imagesUploaded, { id: uuid(), link: url }]);
            })
            .catch((err) => console.log(err));
        });

        await api.post('createImages', {
          data: { id: documentId, images: imagesUploaded },
        });

        setUploadImage(false);
        return;
      }

      const storageRef = firebase.storage().ref();
      const name = `${uuid()}-banner-${files[0].name}`;
      const metadata = {
        contentType: files[0].type,
      };

      const task = storageRef.child(name).put(files[0], metadata);

      task
        .then((snapshop) => {
          return snapshop.ref.getDownloadURL();
        })
        .then((url) => {
          if (inputRef) {
            inputRef.current.value = url;
          }
        })
        .catch((err) => console.log(err));

      toast({
        title: 'Banner enviado.',
        description: 'Finalize a criação da obra pelo botão "Criar".',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setUploadImage(false);
    } catch (err) {
      console.log(err);
      toast({
        title: 'Ocorreu um erro.',
        description: 'Tente novamente.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      setUploadImage(false);
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
          isLoading={uploadingImage}
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
