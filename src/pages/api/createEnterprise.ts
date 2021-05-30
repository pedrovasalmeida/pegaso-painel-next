import { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';
import { fauna } from '../../services/fauna';

import { IFinalEnterprise } from '../../types/IEnterprise';
import { api } from '../../services/api';

import { v4 as uuid } from 'uuid';

type Enterprises = {
  ref: {
    id: string;
  };
  data: IFinalEnterprise;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // criar um documento existente
  let enterprisesDisplayOrder = [];

  try {
    const faunaEnterprises = await fauna.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('enterprises'))),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    );

    if (faunaEnterprises['data'].length < 1) {
      return res.status(403).json({
        error: 'Não existem obras cadastradas.',
        errorCode: 'cannot.get.enterprises',
      });
    }

    const displayOrdersList = [];

    faunaEnterprises['data'].forEach((ent: Enterprises) => {
      displayOrdersList.push(ent.data.displayOrder);
    });

    enterprisesDisplayOrder = displayOrdersList.sort((a, b) => a - b);
  } catch {
    return res.status(400).json({
      error: 'Houve um problema ao buscar alguns dados.',
      errorCode: 'cannot.create.enterprise',
    });
  }

  try {
    const data: IFinalEnterprise = req.body;

    if (!data.banner || data.banner.startsWith('http')) {
      return res
        .status(400)
        .json({
          error: 'Banner inválido ou inexistente.',
          errorCode: 'cannot.create.enterprise',
        });
    }

    const displayOrder =
      enterprisesDisplayOrder[enterprisesDisplayOrder.length - 1] + 1;

    const enterpriseData = {
      id: uuid(),
      name: data.name,
      description: data.description,
      shortDescription: data.shortDescription,
      address: data.address,
      banner: data.banner,
      displayOrder,
      images: [],
      createdAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'numeric',
        year: 'numeric',
      }),
      updatedAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'numeric',
        year: 'numeric',
      }),
    };

    console.log(enterpriseData);

    // await fauna.query(
    //   q.Create(q.Ref(q.Collection('enterprises'), ))
    // );

    return res.status(200).json({ message: 'Dados atualizados com sucesso.' });
  } catch {
    return res.status(400).json({
      error: 'Houve um problema ao criar a obra.',
      errorCode: 'cannot.create.enterprise',
    });
  }
};
