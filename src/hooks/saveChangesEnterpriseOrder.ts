import { IFinalEnterprise } from './../types/IEnterprise';
import firebase from 'firebase/app';
import 'firebase/firestore';

interface SaveEnterpriseOrderChangesProps {
  enterprises: IFinalEnterprise[];
}

export async function saveEnterpriseOrderChanges({
  enterprises,
}: SaveEnterpriseOrderChangesProps) {
  if (enterprises.length <= 0) return;

  enterprises.forEach((enter) => {
    firebase
      .firestore()
      .collection('enterprises')
      .doc(enter.id)
      .set(enter)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
}
