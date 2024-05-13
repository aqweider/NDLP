import storage from '@react-native-firebase/storage';

import { storage as AppStorage } from '@/src/storage';

export const uploadImage = (userId: string, localPath: string | undefined) => {
  if (localPath) {
    const filename = localPath.replace(/^.*[/\\]/, '');
    return uploadMedia(`user/${userId}/profile-photos/${filename}`, localPath);
  }
};

const uploadMedia = async (path: string, localFilePath: string) => {
  const ref = storage().ref(path);
  await ref.putFile(localFilePath);
  return ref.getDownloadURL();
};
