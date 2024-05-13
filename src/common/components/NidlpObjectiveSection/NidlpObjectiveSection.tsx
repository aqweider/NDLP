import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SvgUri } from 'react-native-svg';

import Resize from '@/src/app/assets/icons/resize.svg';
import { Modal, Text } from '@/src/common/components';
import { Color } from '@/src/theme/const';

export const NidlpObjectiveSection = (props) => {
  const {objectives, programIntegration} = props;
  const { t, i18n } = useTranslation();
  const [previewImage, setPreviewImage] = useState<{
    showModal: boolean;
    imageUrl: ImageSourcePropType;
  }>({ showModal: false, imageUrl: '' });
  // const content = [
  //   {
  //     id: '0',
  //     img: i18n.language === 'en' ? Images.objectiveEn1 : Images.objectiveAr1,
  //     style: { height: 273 },
  //   },
  //   {
  //     id: '1',
  //     img: i18n.language === 'en' ? Images.objectiveEn2 : Images.objectiveAr2,
  //     style: { height: 381 },
  //   },
  //   {
  //     id: '2',
  //     img: i18n.language === 'en' ? Images.integrationEn : Images.integrationAr,
  //     style: { height: 381 },
  //   },
  // ];
  return (
    <View style={styles.contentContainer}>
      <Text size={28} color={Color.White} bold mb={8} mt={34}>
        {objectives?.title}
      </Text>
      <Text size={13} color={Color.White} mb={30}>
      {objectives?.description}
      </Text>
      {objectives && objectives?.images.map((item, index) => {
        return (
          <>
            {/* <ReactNativeZoomableView
            disablePanOnInitialZoom={true}
              style={styles.imgOutContainer}
              key={item.id}
              maxZoom={1.4}
              minZoom={0.5}
              zoomStep={0.2}
              initialZoom={1}
              bindToBorders={true}
              > */}
              {/* <Image
                source={item.img}
                style={styles.imgOut}
                resizeMode="contain"
              /> */}
              <Pressable
              style={[{width: '100%', height:200}, styles.imgOutContainer]}
              onPress={() => {
                setPreviewImage({
                  showModal: true,
                  imageUrl: item.src,
                });
              }}
              >
                <SvgUri
                  width="100%"
                  height={200}
                  uri={item.src}
                />
                </Pressable> 
              {/* <Pressable
                style={styles.expandIcon}
                onPress={() => {
                  setPreviewImage({
                    showModal: true,
                    imageUrl: item.src,
                  });
                }}>
                <Resize width={34} height={34} />
              </Pressable> */}
            {/* </ReactNativeZoomableView> */}
            {/* {index === 1 && (
              <Text size={28} color={Color.White} bold mb={21}>
                {t('programIntegration')}
              </Text>
            )} */}
          </>
        );
      })}
      <Text size={28} color={Color.White} bold mb={21}>
       {programIntegration?.title}
      </Text>
      <ReactNativeZoomableView
              style={styles.imgOutContainer}
              disablePanOnInitialZoom={true}
              // key={item.id}
              maxZoom={1.4}
              minZoom={0.5}
              zoomStep={0.2}
              initialZoom={1}
              bindToBorders={true}>
                <Pressable
                style={{width: '100%', height:381}}
                onPress={() => {
                  setPreviewImage({
                    showModal: true,
                    imageUrl: programIntegration?.image,
                  });
                }}
                >
                 <SvgUri
                  width="100%"
                  height={381}
                  uri={programIntegration?.image}
                />
                </Pressable>
              {/* <Pressable
                style={styles.expandIcon}
                onPress={() => {
                  setPreviewImage({
                    showModal: true,
                    imageUrl: programIntegration?.image,
                  });
                }}>
                <Resize width={34} height={34} />
              </Pressable> */}
            </ReactNativeZoomableView>
      <Modal isVisible={previewImage.showModal}>
        <Modal.Container>
          <Modal.ClosingHeader
            onClosePress={() =>
              setPreviewImage(prev => ({ ...prev, showModal: false }))
            }
          />
          <Modal.Body>
            <View style={styles.imgContainer}>
              <ReactNativeZoomableView
                maxZoom={2.5}
                minZoom={0.5}
                zoomStep={0.2}
                initialZoom={1}
                bindToBorders={true}>
                <SvgUri
                  width="100%"
                  height={381}
                  uri={previewImage.imageUrl}
                />
              </ReactNativeZoomableView>
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Color.DarkGunMetal,
    paddingHorizontal: 24,
  },
  expandIcon: { position: 'absolute', right: 15, top: 15 },
  imgContainer: {
    alignSelf: 'center',
    height: '95%',
    width: '95%',
  },
  imgOut: { height: '100%', width: '100%' },
  imgOutContainer: {
    backgroundColor: Color.Arsenic,
    borderRadius: 10,
    height: 273,
    marginBottom: 33,
    paddingVertical: 30,
    width: '100%',
  },
  imgStyle: { height: '70%', marginTop: 16, width: '100%' },
});
