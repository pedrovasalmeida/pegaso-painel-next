import firebase from 'firebase/app';
import 'firebase/firestore';

interface GetOneEnterpriseProps {
  id: string;
}

export async function getOneEnterprises({ id }: GetOneEnterpriseProps) {
  const enterprise = await firebase
    .firestore()
    .collection('enterprises')
    .doc(id)
    .get();

  if (!enterprise) return null;

  return enterprise.data();
}
