import firebase from 'firebase/app';
import 'firebase/firestore';

export async function getEnterprises() {
  const dataFb = await firebase.firestore().collection('enterprises').get();
  const enterprises = dataFb.docs.map((doc) => doc.data());

  if (enterprises.length === 0) {
    return null;
  }

  const finalEnterprises = enterprises.sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return finalEnterprises;
}
