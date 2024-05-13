import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import CloseIcon from '@/src/app/assets/icons/close-square.svg';
import {Images} from '@/src/app/assets/images';
import {
  Button,
  Loader,
  Modal,
  Sheet,
  Text,
  TextInput,
  View,
  Image,
} from '@/src/common/components';
import {
  DeleteAccountModal,
  LanguageModal,
  ListItem,
  LogoutModal,
} from '@/src/common/components/ProfileComponents';
import {Color} from '@/src/theme/const';

import {EditProfile} from './EditProfile';

export type Props = {
  onClosePress: () => void;
};
export const Profile: FC<Props> = ({onClosePress}: Props) => {
  const {t} = useTranslation();

  const [sheetVisible, setSheetVisible] = useState(false);
  const snapPointsLanguage = useMemo(() => ['85%', '85%'], []);

  const handleLanguageModal = () => {
    setSheetVisible(true);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.closingHeader}>
          <Pressable onPress={onClosePress} style={styles.closeContainer}>
            <CloseIcon width={24} height={24} />
          </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image
              source={Images.logo_profile}
              resizeMode="contain"
              style={styles.image}
            />
          </View>

          <View style={styles.listContainer}>
            <ListItem
              title={t('LanguageTitle')}
              onPress={handleLanguageModal}
              languageText
            />
          </View>
        </ScrollView>

        <Sheet
          snapPoints={snapPointsLanguage}
          isVisible={sheetVisible}
          onClose={() => {
            setSheetVisible(false);
          }}
          backgroundColor={Color.DarkGunMetal}
          >
          <LanguageModal />
        </Sheet>
      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  closeContainer: {
    // alignSelf: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 40,
    zIndex: 10,
  },
  closingHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
  },
  container: {
    backgroundColor: Color.DarkGunMetal,
    flex: 1,
    paddingTop: 24,
  },
  image: {
    height: 100,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 48,
  },
  listContainer: {
    backgroundColor: Color.Jacarta,
    borderRadius: 16,
    elevation: 4,
    marginBottom: 10,
    marginHorizontal: 24,
    marginTop: 48,
    shadowColor: Color.Black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.21,
  },
});
