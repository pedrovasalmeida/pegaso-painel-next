import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

import { IEnterprise, IFinalEnterprise } from '../types/IEnterprise';
import fakeData from './fake-data.json';

interface EnterprisesProviderProps {
  children: ReactNode;
}

type EnterpriseContextData = {
  enterprises: IFinalEnterprise[];
  loadingEnterprisesData: boolean;
  setSingleEnterpriseData: (project: IFinalEnterprise | null) => void;
  singleEnterprise: IFinalEnterprise | null;
};

const EnterpriseContext = createContext({} as EnterpriseContextData);

export function EnterprisesProvider({ children }: EnterprisesProviderProps) {
  const [enterprises, setEnterprises] = useState<IFinalEnterprise[]>([]);
  const [singleEnterprise, setSingleEnterprise] =
    useState<IFinalEnterprise | null>(null);
  const [loadingEnterprisesData, setLoadingEnterprisesData] = useState(false);

  async function getEnterprises() {
    setLoadingEnterprisesData(true);

    try {
      const response = await api.get('getEnterprises');

      const finalEnterprises = response.data.enterprises.sort(
        (a, b) => a.displayOrder - b.displayOrder
      );

      setEnterprises(finalEnterprises);
      setLoadingEnterprisesData(false);
    } catch {
      setEnterprises([]);
      setLoadingEnterprisesData(false);
    }
  }

  function setSingleEnterpriseData(project: IFinalEnterprise | null) {
    setSingleEnterprise(project);
  }

  useEffect(() => {
    // getEnterprises();
  }, []);

  return (
    <EnterpriseContext.Provider
      value={{
        enterprises,
        loadingEnterprisesData,
        setSingleEnterpriseData,
        singleEnterprise,
      }}
    >
      {children}
    </EnterpriseContext.Provider>
  );
}

export const useEnterpriseContext = () => useContext(EnterpriseContext);
