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

type SignInData = {
  email: string;
  password: string;
};

interface AuthContextProps {
  user: IUser;
  signIn: (data: SignInData) => Promise<void>;
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
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authId, setAuthId] = useState<string | null>(null);

  const signIn = async ({ email, password }: SignInData) => {
    const { data } = await api.post('/signIn', { email, password });

    if (data.statusCode === 400 || data.errorCode === 'cannot.sign_in') {
      setUser(null);
      setAuthId(null);

      destroyCookie(undefined, 'pegaso.auth');
      Router.push('/');
      throw new Error('Credenciais inválidas');
    }

    setCookie(undefined, 'pegaso.auth', data.authId, {
      maxAge: 60 * 60 * 24, // 24 horas
      path: '/',
    });

    setUser(data.user);
    setAuthId(data.authId);

    Router.push('/dashboard');
  };

  const signOut = () => {
    destroyCookie(undefined, 'pegaso.auth');
    setUser(null);
    setAuthId(null);

    authChannel.postMessage('signOut');

    Router.push('/');
  };

  const verifyUser = () => {};

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
