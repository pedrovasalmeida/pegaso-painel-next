import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { parseCookies, setCookie, destroyCookie } from 'nookies';

import firebase from 'firebase';
import 'firebase/auth';

import { IUser } from '../types/IEnterprise';
import Router from 'next/router';
import { api } from '../services/api';

type SignInProps = {
  email: string;
  password: string;
};

interface AuthContextProps {
  user: IUser;
  signIn: (data: SignInProps) => Promise<boolean>;
  signOut: () => void;
  isLoadingSignIn: boolean;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

let authChannel: BroadcastChannel;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser>(null);
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async ({ email, password }: SignInProps) => {
    setIsLoadingSignIn(true);

    const logged = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        const loggedUser: IUser = {
          uid: res.user.uid,
          email: res.user.email,
        };

        setUser(loggedUser);

        setCookie(undefined, 'pegaso-user-email', loggedUser.email, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });

        setCookie(undefined, 'pegaso-user-uid', loggedUser.uid, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });

        setCookie(undefined, 'pegaso-authenticated', 'true', {
          path: '/',
          maxAge: 60 * 60 * 2,
        });

        setIsAuthenticated(true);

        return true;
      })
      .catch(() => {
        signOut();
        setIsAuthenticated(false);
        return false;
      });

    setIsLoadingSignIn(false);

    if (logged) {
      setIsAuthenticated(true);
      return true;
    }

    setIsAuthenticated(false);
    return false;
  };

  const signOut = () => {
    destroyCookie(undefined, 'pegaso-user-email');
    destroyCookie(undefined, 'pegaso-user-uid');
    setIsAuthenticated(false);

    authChannel.postMessage('signOut');

    Router.push('/');
  };

  const verifyUser = () => {};

  // toda vez que acessar uma rota
  // verificar se o usuário é válido

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          authChannel.close();
          break;
        default:
          break;
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, isLoadingSignIn, signOut, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
