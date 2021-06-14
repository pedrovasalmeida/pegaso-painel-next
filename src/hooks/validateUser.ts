import jwt from 'jsonwebtoken';
import nookies from 'nookies';

import firebase from 'firebase/app';
import 'firebase/firestore';

type IsUserValidProps = {
  authId: string;
  ctx: any;
};

export const validateUser = async ({ authId, ctx }: IsUserValidProps) => {
  const authRegisterFb = await firebase
    .firestore()
    .collection('auth')
    .doc(authId)
    .get();

  const authRegister = authRegisterFb.data();

  if (!authRegister) {
    return {
      shouldRedirect: true,
      isUserValid: false,
    };
  }

  const { token } = authRegister;

  const jwtVerified = jwt.verify(token, process.env.JWT_SECRET);

  if (!!!jwtVerified) {
    return {
      shouldRedirect: true,
      isUserValid: false,
    };
  }

  return {
    shouldRedirect: false,
    isUserValid: true,
  };
};
