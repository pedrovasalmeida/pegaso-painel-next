import firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import 'firebase/storage';
import 'firebase/firestore';

interface CreateImageProps {
  file: File;
  enterpriseId: string;
}

export async function createImages({ file, enterpriseId }: CreateImageProps) {
  // upa imagens e salva no documento images com ID igual ao do empreendimento
  const storageRef = firebase.storage().ref();

  const name = `${uuid()}-banner`;
  const metadata = {
    contentType: file.type,
  };

  let downloadURL: string;

  const task = storageRef.child(name).put(file, metadata);

  await task
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    })
    .then((url) => {
      downloadURL = url;
    });

  const image = {
    id: uuid(),
    link: downloadURL,
  };

  const images = await firebase
    .firestore()
    .collection('images')
    .doc(enterpriseId)
    .get();

  const newImages = images.data();

  const array = newImages.images.map((image) => image);

  if (array.length > 0) {
    const finalArray = [...array, image];

    await firebase
      .firestore()
      .collection('images')
      .doc(enterpriseId)
      .set(finalArray)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  } else {
    const finalArray = [image];

    await firebase
      .firestore()
      .collection('images')
      .doc(enterpriseId)
      .set(finalArray)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
