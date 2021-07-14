import firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import path from 'path';
import { api } from '../services/api';

interface CreateImageProps {
  files: File[];
  enterpriseId: string;
}

export async function createImages({
  files,
  enterpriseId = null,
}: CreateImageProps) {
  // upa imagens e salva no documento images com ID igual ao do empreendimento
  if (!files) {
    return;
  }

  await api.post('/createImages', { files, enterpriseId });

  // const response = await client.upload('public/images/pegaso-logo.png');

  // console.log(response.link);
}
