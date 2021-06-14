import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // try {
  const enterpriseId = req.body.id;

  const enterprise = await firebase
    .firestore()
    .collection('enterprises')
    .doc(enterpriseId)
    .get();

  const bannerUrl: string = enterprise.data().banner;
  const enterpriseImages: any[] = enterprise.data().images;

  console.log(bannerUrl);
  console.log(enterpriseImages);

  return false;

  if (bannerUrl !== 'invalid_link') {
    const bannerRef = await firebase.storage().refFromURL(bannerUrl);
    console.log(`Banner ref: ${bannerRef}`);

    bannerRef
      .delete()
      .then()
      .catch((err) => console.log(err));
  }
  // deve percorrer o array de imagens e ir deletando as imagens também
  if (enterpriseImages.length > 0) {
    enterpriseImages.forEach((image) => {
      // id, link
      const imageRef = firebase.storage().refFromURL(image.link);

      imageRef
        .delete()
        .then()
        .catch((err) => console.log(err));
    });
  }

  await firebase
    .firestore()
    .collection('enterprises')
    .doc(enterpriseId)
    .delete();

  return res
    .status(200)
    .json({ message: 'Obra excluída com sucesso', status: 'success' });
  // } catch (err) {
  //   return res.status(400).json({
  //     error: 'Houve um problema ao remover a obra.',
  //     errorCode: 'cannot.destroy.enterprise',
  //     errorMessage: err,
  //   });
  // }
};
