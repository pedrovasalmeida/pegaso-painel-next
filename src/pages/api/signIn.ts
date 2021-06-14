import { NextApiRequest, NextApiResponse } from 'next';
import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import { IUser } from '../../types/ISignIn';

import firebase from 'firebase/app';
import 'firebase/firestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const dataFb = await firebase.firestore().collection('users').get();
    const users = dataFb.docs.map((doc) => doc.data());
    const user = users[0];

    const decryptPassword = await compare(password, user.password);

    const userEmailIsValid = user.email === email;
    const userPasswordIsValid = decryptPassword;

    if (!userEmailIsValid || !userPasswordIsValid) {
      throw new Error('Credenciais inválidas');
    }

    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    const authRegister = {
      id: uuid(),
      token: jwtToken,
      userId: user.id,
    };

    const returnedUser = {
      id: user.id,
      email,
    };

    await firebase
      .firestore()
      .collection('auth')
      .doc(authRegister.id)
      .set(authRegister);

    return res.status(200).json({
      errorCode: null,
      errorMessage: null,
      user: returnedUser,
      authId: authRegister.id,
    });
  } catch (err) {
    return res.status(400).json({
      errorCode: 'cannot.sign_in',
      errorMessage: 'Credenciais inválidas',
    });
  }
};
