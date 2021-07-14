export interface IEnterprise {
  id: string;
  banner: string;
  name: string;
  address: string;
  description: string;
  shortDescription: string;
  displayOrder: number;
  images: {
    id: string;
    link: string;
  }[];
  created_at: string;
  updated_at: string;
}
