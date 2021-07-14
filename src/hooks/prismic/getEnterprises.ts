import { IEnterprise } from '../../types/Enterprise';

interface GetEnterpriseProps {
  enterprises: any[];
}

export function getEnterprises({ enterprises }: GetEnterpriseProps) {
  const formattedEnterprises = enterprises.map((enterprise) => {
    return {
      id: enterprise.uid,
      name: enterprise.data.name[0].text,
      banner: enterprise.data.banner.url,
      address: enterprise.data.address[0].text,
      description: enterprise.data.description[0].text,
      shortDescription: enterprise.data.short_description[0].text,
      displayOrder: enterprise.data.display_order,
      images: [],
      created_at: enterprise.data.created_at,
      updated_at: enterprise.data.updated_at,
    };
  });

  const orderedEnterprises = formattedEnterprises.sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return orderedEnterprises;
}
