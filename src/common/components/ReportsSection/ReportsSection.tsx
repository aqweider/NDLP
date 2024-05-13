import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';

import Download from '@/src/app/assets/icons/download1.svg';
import Eye from '@/src/app/assets/icons/eye.svg';
import { downloadFile } from '@/src/app/services/downloadFile';
import { Modal, Text } from '@/src/common/components';
import { Color } from '@/src/theme/const';

export const ReportsSection = (props) => {
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [progress, setProgress] = useState<{ [key: string]: string }>();
  const {reportsData} = props;
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleProgress = (id: string, progress: string) => {
    setProgress(prev => ({ ...prev, [`${id}`]: progress }));
  };

  return (
    <View>
      {reportsData && reportsData.map((item, index) => {
        return (
          <View key={index}>
            <Text bold size={16} color={Color.White} mb={21}>
              {item.title}
            </Text>
            <View style={styles.boxContainer}>
              <Pressable
                style={styles.box}
                onPress={() => {
                  setIsPdfVisible(true);
                  setPdfUrl(item.pdfUrl);
                }}>
                <Text bold color={Color.White} size={18}>
                  {t('view')}
                </Text>
                <Eye width={30} height={30} style={{ marginStart: 10 }} />
              </Pressable>
              <Pressable
                style={styles.box}
                disabled={
                  !!progress?.[index.toString()] &&
                  progress?.[index.toString()] !== '100'
                }
                onPress={() => {
                  downloadFile(item.pdfUrl, item.title, (progress: string) =>
                    handleProgress(index.toString(), progress),
                  );
                }}>
                {!!progress?.[index.toString()] &&
                progress?.[index.toString()] !== '100' ? (
                  <Text color={Color.White} size={18}>
                    {progress[index.toString()]}%
                  </Text>
                ) : (
                  <>
                    <Text bold color={Color.White} size={18}>
                      {t('download')}
                    </Text>
                    <Download
                      width={30}
                      height={30}
                      style={{ marginStart: 10 }}
                    />
                  </>
                )}
              </Pressable>
            </View>
          </View>
        );
      })}

      <Modal isVisible={isPdfVisible}>
        <Modal.Container>
          <Modal.ClosingHeader onClosePress={() => setIsPdfVisible(false)} />
          <Modal.Body>
            <View style={styles.pdfContainer}>
              <ScrollView contentContainerStyle={{ flex: 1 }}>
                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: pdfUrl,
                    cache: true,
                  }}
                  onError={error => {
                    console.log(error);
                  }}
                  style={styles.pdf}
                  renderActivityIndicator={progress => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text size={28} color={Color.White}>
                          {(progress * 100).toFixed(0)} %
                        </Text>
                      </View>
                    );
                  }}
                />
              </ScrollView>
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    borderColor: Color.White,
    borderRadius: 10,
    borderWidth: 1.4,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 27,
    paddingVertical: 24,
    width: '45%',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  pdf: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  pdfContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 5,
  },
});
