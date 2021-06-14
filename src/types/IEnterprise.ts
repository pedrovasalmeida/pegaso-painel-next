export interface IEnterprise {
  id: string;
  name: string;
  displayOrder: number;
}

export interface IFinalEnterprise {
  ref: string;
  id: string;
  name: string;
  banner: string;
  description: string;
  shortDescription: string;
  address: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  images: {
    id: string;
    link: string;
    imageDisplayOrder: string;
  }[];
}

export type IUser = {
  id: string;
  email: string;
};
