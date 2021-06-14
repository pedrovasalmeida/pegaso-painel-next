import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

interface UploadMultipleImagesProps {
  id: string;
  images: {
    id: string;
    link: string;
  }[];
}

export async function uploadMultipleImages({
  id,
  images,
}: UploadMultipleImagesProps) {
  console.log(images);
  return;

  try {
    const enterprise = await firebase
      .firestore()
      .collection('enterprises')
      .doc(id)
      .get();

    if (!enterprise) return null;

    await firebase
      .firestore()
      .collection('enterprises')
      .doc(id)
      .update({
        ...enterprise.data(),
        images,
      });
  } catch (err) {
    console.log(err);
  }
}
