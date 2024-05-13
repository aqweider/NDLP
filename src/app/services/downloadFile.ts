import { Platform } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';

export const downloadFile = (
  fileUrl: string,
  title: string,
  setProgress: (arg0: string) => void,
) => {
  const source = fileUrl;
  const { dirs } = ReactNativeBlobUtil.fs;
  Platform.OS === 'ios' && setProgress('0');
  ReactNativeBlobUtil.config({
    fileCache: true,
    appendExt: 'pdf',
    path: `${dirs.DocumentDir}/${title}`,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title,
      description: 'File downloaded from daleel sa.',
      mime: 'application/pdf',
      path : dirs.DownloadDir+title+'.pdf', 
    },
  })
    .fetch('GET', source)
    // listen to download progress event, every 10%
    .progress({ count: 15 }, (received, total) => {
      Platform.OS === 'ios' &&
        setProgress(((received / total) * 100).toFixed(0));
    })
    .then(res => {
      // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
      // whereas in android, the download manager is handling the download for us.
      if (Platform.OS === 'ios') {
        const filePath = res.path();
        const options = {
          type: 'application/pdf',
          url: filePath,
          saveToFiles: true,
        };
        Share.open(options)
          .then(resp => console.log(resp))
          .catch(error => console.log(error));
      }
    })
    .catch(error => {
      setProgress('100');
      console.log('BLOB ERROR ->', error);
    });
};
