import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

export async function sendImagesToFirebase({ files }) {
  if (files.length <= 0) return false;

  const storage = firebase.storage();
  const storageRef = storage.ref();

  files.forEach((file) => {
    storageRef
      .put(file)
      .then((snapshot) => console.log(snapshot))
      .catch((err) => false);
  });

  return true;
}
