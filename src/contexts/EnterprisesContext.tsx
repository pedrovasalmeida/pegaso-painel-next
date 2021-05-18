import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { IEnterprise } from '../types/IEnterprise';
import fakeData from './fake-data.json';

interface EnterprisesProviderProps {
  children: ReactNode;
}

type EnterpriseContextData = {
  enterprises: IEnterprise[];
};

const EnterpriseContext = createContext({} as EnterpriseContextData);

export function EnterprisesProvider({ children }: EnterprisesProviderProps) {
  const [enterprises, setEnterprises] = useState<IEnterprise[]>([]);

  function changeDisplayOrder(
    projects: IEnterprise[],
    orderFrom: number,
    orderTo: number
  ) {
    const elementFrom = projects.find(
      (proj) => proj.displayOrder === orderFrom
    );
    const elementTo = projects.find((proj) => proj.displayOrder === orderTo);

    const newElementFrom = {
      displayOrder: orderTo,
      ...elementFrom,
    };

    const newElementTo = {
      displayOrder: orderFrom,
      ...elementTo,
    };

    const enterprisesChanged = [];

    // vai até o projeto de displayOrder = orderFrom
    // identifica os 2 elementos
    // set displayOrder = orderTo
    // set displayOrder do elemento antigo para orderFrom
  }

  useEffect(() => {
    setEnterprises(fakeData);
  }, []);

  return (
    <EnterpriseContext.Provider value={{ enterprises }}>
      {children}
    </EnterpriseContext.Provider>
  );
}

export const useEnterpriseContext = () => useContext(EnterpriseContext);
