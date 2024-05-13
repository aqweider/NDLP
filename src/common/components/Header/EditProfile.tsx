import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import validator from 'validator';

import ArrowIconDark from '@/src/app/assets/icons/arrow-left-dark.svg';
import {Images} from '@/src/app/assets/images';
import {useAuth} from '@/src/app/auth/useAuth';
import {uploadImage} from '@/src/app/utils/UploadImage';
import {
  Button,
  Loader,
  Text,
  TextInput,
  View,
  Image,
} from '@/src/common/components';
import {Color} from '@/src/theme/const';

export type Props = {
  onBackPress: () => void;
};
export const EditProfile: FC<Props> = ({onBackPress}: Props) => {
  const {i18n} = useTranslation();

  const {user} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<{uri: string | undefined}>();
  const [userInfo, setUserInfo] = useState<any>({
    name: '',
    phone: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    if (user) {
      const subscriber = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
          setUserInfo(documentSnapshot?.data());
        });
      return () => subscriber();
    }
  }, [user]);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setPhone(userInfo.phone);
    }
  }, [userInfo]);
  const isValid = () => {
    if (
      !validator.isNumeric(phone) ||
      !validator.isLength(phone, {min: 7, max: 12})
    ) {
      setErrorMsg(t('wrongPhone'));
      return false;
    } else if (!validator.isLength(phone, {min: 7})) {
      setErrorMsg(t('strongPassword'));
      return false;
    } else if (password === '' && newPassword !== '') {
      setErrorMsg(t('enterOldPassword'));
      return false;
    } else {
      setErrorMsg('');
      return true;
    }
  };
  const changePassword = async () => {
    if (newPassword !== '') {
      try {
        setLoading(true);
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email || '',
          password,
        );
        await auth().currentUser?.reauthenticateWithCredential(credential);
        await auth().currentUser?.updatePassword(newPassword);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setErrorMsg(error.message);
      }
    }
  };
  const updateInfo = async () => {
    if (isValid()) {
      try {
        changePassword();
        image && setLoading(true);
        const url = image ? await uploadImage(user.uid, image?.uri) : '';
        if (
          (phone !== userInfo.phone && phone !== '') ||
          (name !== userInfo.name && name !== '') ||
          url !== ''
        ) {
          setLoading(true);
          await firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              ...(phone !== '' && phone !== userInfo.phone && {phone}),
              ...(name !== '' && name !== userInfo.name && {name}),
              ...(url !== '' && {image: url}),
            })
            .then(() => {
              setLoading(false);
            });
        }
      } catch (error: any) {
        setLoading(false);
        setErrorMsg(error.message);
      }
    }
  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 2000,
        maxHeight: 2000,
      },
      response => {
        if (response.assets) {
          const source = {
            uri: response.assets ? response.assets[0].uri : undefined,
          };
          setImage(source);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      {loading && <Loader transparent />}
      <View style={styles.closingHeader}>
        <Pressable
          onPress={onBackPress}
          style={[
            styles.iconContainer,
            i18n.language === 'ar' && {transform: [{scaleX: -1}]},
          ]}>
          <ArrowIconDark width={32} height={32} />
        </Pressable>
      </View>
      <ScrollView style={styles.form}>
        <Pressable style={styles.imageContainer} onPress={selectImage}>
          {image ? (
            <Image source={{uri: image.uri}} style={styles.personalImage} />
          ) : (
            <View>
              <Image
                source={
                  userInfo?.image !== ''
                    ? {uri: userInfo.image}
                    : Images.emptyImage
                }
                style={
                  userInfo?.image !== '' ? styles.personalImage : styles.image
                }
              />
              {userInfo?.image !== '' && (
                <View
                  style={[
                    styles.maskContainer,
                    i18n.language === 'ar' ? {right: -5} : {left: -5},
                  ]}>
                  <Image
                    source={Images.mask}
                    style={styles.maskImage}
                    resizeMode="cover"
                  />
                </View>
              )}
            </View>
          )}
          <Text bold size={17} color={Color.Primary} mt={8} mb={24}>
            {!(userInfo.image !== '' || image) && t('uploadPhoto')}
          </Text>
        </Pressable>
        <TextInput
          placeholder={t('Name')}
          value={name}
          onChangeText={val => setName(val)}
        />
        <TextInput
          placeholder={user.email || t('Email')}
          value={email}
          onChangeText={val => setEmail(val)}
          editable={false}
        />
        <TextInput
          placeholder={t('Phone')}
          value={phone}
          onChangeText={val => setPhone(val)}
          phoneTextInput
          keyboardType="phone-pad"
          maxLength={12}
        />
        <TextInput
          placeholder={t('oldPassword')}
          value={password}
          onChangeText={val => setPassword(val)}
          secureTextEntry={true}
        />
        <TextInput
          placeholder={t('newPassword')}
          value={newPassword}
          onChangeText={val => setNewPassword(val)}
          secureTextEntry={true}
        />
        {errorMsg !== '' && (
          <Text color={Color.DarkRed} mt={8} mb={8}>
            {errorMsg}
          </Text>
        )}
        <Button title={t('save')} onPress={updateInfo} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  closingHeader: {
    alignItems: 'flex-start',
    marginTop: 24,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 24,
  },
  form: {
    width: '100%',
  },
  iconContainer: {
    marginTop: 40,
    zIndex: 10,
  },
  image: {
    height: 115,
    width: 115,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskContainer: {
    borderRadius: 115,
    bottom: 0,
    height: 150,
    position: 'absolute',
    top: -5,
    width: 150,
  },
  maskImage: {
    height: '100%',
    width: '100%',
  },
  personalImage: {
    borderRadius: 115,
    height: 115,
    width: 115,
  },
});
