import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View , Dimensions, Image, Platform} from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { SvgUri } from 'react-native-svg';
const isAndroid = Platform.OS === 'android'


import Resize from '@/src/app/assets/icons/resize.svg';
import { Modal } from '@/src/common/components';

type Props = {
  passedImage: string;
};

export default ({ passedImage }: Props) => {
  const isImage = passedImage && passedImage.substring(passedImage.length - 3) !== 'svg';
  
  const [previewImage, setPreviewImage] = useState<{
    showModal: boolean;
    imageUrl: string;
  }>({
    showModal: false,
    imageUrl: passedImage,
  });

  return (
    <View style={{marginTop: 10}}>
          <Pressable 
          style={{width: '100%', height: 200, alignItems: 'center', justifyContent: 'center', backgroundColor: '#39334B'}}
          onPress={() => {
            setPreviewImage({
              showModal: true,
              imageUrl: passedImage,
            });
          }}
          >
            {isImage && isAndroid ?
             <FastImage
             style={[styles.focusedImgStyle]}
             source={{uri:previewImage?.imageUrl}}
             resizeMode={FastImage.resizeMode.contain}
           />
             : isImage && !isAndroid ?
             <Image
             style={[styles.focusedImgStyle]}
             source={{uri:previewImage?.imageUrl}}
             resizeMode='contain'
            />
           :
             <SvgUri
              width="100%"
              height={200}
              uri={passedImage}
            />
            }
          </Pressable>
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
                zoomStep={0.4}
                initialZoom={1}
                bindToBorders={true}>
                {isImage ? 
                <FastImage
                  style={[styles.focusedImgStyle]}
                  source={{uri:previewImage.imageUrl}}
                  resizeMode={FastImage.resizeMode.contain}
                />
                : 
                <SvgUri
                  width="95%"
                  height={'100%'}
                  uri={previewImage.imageUrl}
                />
                }
              </ReactNativeZoomableView>
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  expandIcon: { position: 'absolute', right: 0, top: '45%' },

  focusedImgStyle: { height: '100%', width: '100%', resizeMode: 'stretch' },
  imgContainer: {
    flex: 1,
  },
  imgStyle: { height: 200, marginTop: 16, width: '100%' },
});
