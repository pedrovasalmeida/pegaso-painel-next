import axios from 'axios';
import FormData from 'form-data';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

interface RequestBody {
  files: File[];
  enterpriseId: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let data = new FormData();
  const { files, enterpriseId }: RequestBody = req.body;
  const image = path.resolve('src', 'assets', 'pegaso-logo.png');

  data.append('image', fs.createReadStream(files[0].name));

  axios({
    method: 'post',
    url: `https://api.imgur.com/3/upload`,
    headers: {
      Authorization: `Client-ID ${process.env.CLIENT_ID}`,
      ...data.getHeaders(),
    },
    data,
  })
    .then(function (resp) {
      console.log(resp.data);
    })
    .catch(function (error) {
      // console.log(error);
      console.log(error.message);
    });

  return res.json({
    message: 'Requisição feita',
  });
};
