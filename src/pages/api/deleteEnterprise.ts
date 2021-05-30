import { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';
import { fauna } from '../../services/fauna';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const enterpriseRef = req.body.ref;

    await fauna.query(
      q.Delete(q.Ref(q.Collection('enterprises'), enterpriseRef))
    );

    return res.status(204);
  } catch {
    return res.status(400).json({
      error: 'Houve um problema ao remover a obra.',
      errorCode: 'cannot.destroy.enterprise',
    });
  }
};
