import { Flex, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { SortCard } from './Card/ChangeOrder';

import { IEnterprise, IFinalEnterprise } from '../types/IEnterprise';

import { useEnterpriseContext } from '../contexts/EnterprisesContext';
import { useCan } from '../hooks/useValidate';
import { GetServerSideProps } from 'next';

interface ListSortProps {
  enterprises?: IFinalEnterprise[];
  hasChanges: any;
  setNewEnterprises: any;
}

export default function ListSort({
  enterprises = [],
  hasChanges,
  setNewEnterprises,
}: ListSortProps) {
  const [changedEnterprises, setChangedEnterprises] = useState(enterprises);
  const [listOfEnterprisesId, setListOfEnterprisesId] = useState<string[]>([]);

  function handleChangeDisplayOrder(direction: string, enterpriseId: string) {
    if (direction === 'up') {
      // display order -1
      const enterpriseIndexToChange = changedEnterprises.findIndex(
        (enter) => enter.id === enterpriseId
      );

      const newEnterprisesOrder = changedEnterprises.map((enter, index) => {
        // próximos elementos (nada)
        if (index > enterpriseIndexToChange) return enter;

        // elemento a alterar (-1)
        if (index === enterpriseIndexToChange) {
          const newEnterpriseOrder = {
            ...enter,
            displayOrder: enter.displayOrder - 1,
          };

          return newEnterpriseOrder;
        }

        if (index === enterpriseIndexToChange - 1) {
          if (enterpriseIndexToChange - 1 === 1) {
            const newEnterpriseOrder = {
              ...enter,
            };

            return newEnterpriseOrder;
          }

          const newEnterpriseOrder = {
            ...enter,
            displayOrder: enter.displayOrder + 1,
          };

          return newEnterpriseOrder;
        }

        return enter;
      });

      const sortedNewEnterprises = newEnterprisesOrder.sort(
        (a, b) => a.displayOrder - b.displayOrder
      );

      setChangedEnterprises(sortedNewEnterprises);
      hasChanges(true);
    }

    if (direction === 'down') {
      // display order +1
      const enterpriseIndexToChange = changedEnterprises.findIndex(
        (enter) => enter.id === enterpriseId
      );

      const newEnterprisesOrder = changedEnterprises.map((enter, index) => {
        if (index < enterpriseIndexToChange) return enter;

        if (index === enterpriseIndexToChange) {
          const newEnterpriseOrder = {
            ...enter,
            displayOrder: enter.displayOrder + 1,
          };

          return newEnterpriseOrder;
        }

        if (index === enterpriseIndexToChange + 1) {
          const newEnterpriseOrder = {
            ...enter,
            displayOrder: enter.displayOrder - 1,
          };

          return newEnterpriseOrder;
        }

        return enter;
      });

      const sortedNewEnterprises = newEnterprisesOrder.sort(
        (a, b) => a.displayOrder - b.displayOrder
      );

      setChangedEnterprises(sortedNewEnterprises);
      hasChanges(true);
    }
  }

  function verifyOrderOfEnterprises() {
    if (changedEnterprises.length !== 0) {
      changedEnterprises.forEach((enter, index) => {
        if (enter.id !== listOfEnterprisesId[index]) {
          setNewEnterprises(changedEnterprises);
          return;
        }
      });
    }
  }

  useEffect(() => {
    const listOfEnterprisesId = changedEnterprises.map((enter) => enter.id);
    setListOfEnterprisesId(listOfEnterprisesId);
    hasChanges(false);
  }, []);

  useEffect(() => {
    verifyOrderOfEnterprises();
  }, [changedEnterprises]);

  return (
    <VStack spacing="6">
      {/* <SimpleGrid minChildWidth="100%" spacing={['6', '8']} w="100%"> */}

      {changedEnterprises.map((enterprise) => (
        <SortCard
          key={enterprise.id}
          enterprise={enterprise}
          enterpriseLength={enterprises.length}
          handleChangeDisplayOrder={handleChangeDisplayOrder}
        />
      ))}

      {/* </SimpleGrid> */}
    </VStack>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserValid = await useCan({ ctx });

  if (!isUserValid) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
