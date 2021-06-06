import { NextApiRequest, NextApiResponse } from 'next';

import firebase from 'firebase/app';
import 'firebase/firestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = req.body;

    const dataFb = await firebase.firestore().collection('users').get();

    const users = dataFb.docs.map((doc) => doc.data());

    const userIsValid = users[0].uid === data.uid;

    return res.status(200).json({ userIsValid });
  } catch (err) {
    console.log(err);
    return res.status(400);
  }
};
