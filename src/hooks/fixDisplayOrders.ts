import { IFinalEnterprise } from './../types/IEnterprise';

interface FixDisplayOrderProps {
  enterprises: any;
}

export function fixDisplayOrders({ enterprises }: FixDisplayOrderProps) {
  const sortedEnterprises = enterprises.sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  const fixedEnterprises = sortedEnterprises.map((enter, index) => {
    return {
      ...enter,
      displayOrder: index + 1,
    };
  });

  return fixedEnterprises;
}
