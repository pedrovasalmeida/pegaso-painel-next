import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

interface DeleteEnterpriseProps {
  id: string;
}

export async function deleteEnterprise({ id }: DeleteEnterpriseProps) {
  try {
    const enterprise = await firebase
      .firestore()
      .collection('enterprises')
      .doc(id)
      .get();

    const bannerUrl: string = enterprise.data().banner;
    const enterpriseImages: any[] = enterprise.data().images;

    if (bannerUrl !== 'invalid_link') {
      const bannerRef = await firebase.storage().refFromURL(bannerUrl);
      console.log(`Banner ref: ${bannerRef}`);

      await bannerRef
        .delete()
        .then()
        .catch((err) => console.log(err));
    }
    // deve percorrer o array de imagens e ir deletando as imagens também

    if (enterpriseImages.length !== 0) {
      enterpriseImages.forEach((image) => {
        // id, link
        const imageRef = firebase.storage().refFromURL(image.link);

        imageRef
          .delete()
          .then()
          .catch((err) => console.log(err));
      });
    }

    await firebase.firestore().collection('enterprises').doc(id).delete();

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
