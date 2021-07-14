import { NextApiRequest, NextApiResponse } from 'next';
// import { query as q } from 'faunadb';
import { fauna } from '../../services/fauna';

import { IFinalEnterprise } from '../../types/IEnterprise';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('edit api');
  // try {
  //   const enterpriseRef = req.body.ref;
  //   const data: IFinalEnterprise = req.body;

  //   const enterpriseData = {
  //     id: data.id,
  //     name: data.name,
  //     description: data.description,
  //     shortDescription: data.shortDescription,
  //     address: data.address,
  //     banner: data.banner,
  //     displayOrder: data.displayOrder,
  //     images: data.images,
  //     createdAt: data.createdAt,
  //     updatedAt: data.updatedAt,
  //   };

  //   await fauna.query(
  //     q.Update(q.Ref(q.Collection('enterprises'), enterpriseRef), {
  //       data: {
  //         ...enterpriseData,
  //       },
  //     })
  //   );

  //   return res.status(200).json({ message: 'Dados atualizados com sucesso.' });
  // } catch {
  //   return res.status(400).json({
  //     error: 'Houve um problema ao atualizar os dados.',
  //     errorCode: 'cannot.update.enterprise',
  //   });
  // }
};
