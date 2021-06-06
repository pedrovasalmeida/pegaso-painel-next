import { NextApiRequest, NextApiResponse } from 'next';

import { IFinalEnterprise } from '../../types/IEnterprise';

import firebase from 'firebase/app';
import 'firebase/firestore';

type Enterprises = {
  ref: {
    id: string;
  };
  data: IFinalEnterprise;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // enviar imagens para firebase e adicionar na obra
  } catch (err) {
    console.log(err);
    return res.status(400);
  }
};

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const faunaEnterprises = await fauna.query(
//       q.Map(
//         q.Paginate(q.Documents(q.Collection('enterprises'))),
//         q.Lambda('X', q.Get(q.Var('X')))
//       )
//     );

//     if (faunaEnterprises['data'].length < 1) {
//       return res.status(403).json({
//         error: 'Não existem obras cadastradas',
//         errorCode: 'cannot.get.enterprises',
//       });
//     }

//     const enterprises = faunaEnterprises['data'].map((ent: Enterprises) => {
//       return {
//         ref: ent.ref.id,
//         id: ent.data.id,
//         name: ent.data.name,
//         banner: ent.data.banner,
//         description: ent.data.description,
//         shortDescription: ent.data.shortDescription,
//         address: ent.data.address,
//         displayOrder: ent.data.displayOrder,
//         createdAt: ent.data.createdAt,
//         updatedAt: ent.data.updatedAt,
//         images: ent.data.images.map((image) => ({
//           id: image.id,
//           link: image.link,
//           imageDisplayOrder: image.imageDisplayOrder,
//         })),
//       };
//     });

//     return res.status(200).json({ enterprises });
//   } catch {
//     return res.status(400).json({
//       error: 'Problema ao obter obras.',
//       errorCode: 'cannot.get.enterprises',
//     });
//   }
// };
