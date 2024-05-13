/* eslint-disable sonarjs/no-duplicate-string */
import React, {FC, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import validator from 'validator';

import ArrowIcon from '@/src/app/assets/icons/arrow-left.svg';
import {Images} from '@/src/app/assets/images';
import {sendMessageService} from '@/src/app/services/sendMessage';
import {
  GradientView,
  Loader,
  Text,
  TextInput,
  View,
  Image,
} from '@/src/common/components';
import {Color} from '@/src/theme/const';

interface Props {
  contactUsVisible: boolean;
  closeContactUs: () => void;
  closeButtonAction?: () => void;
}
export const ContactUsModal: FC<Props> = ({
  contactUsVisible,
  closeContactUs,
  closeButtonAction,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      phoneNumber: '',
      description: '',
    },
  });
  const {t, i18n} = useTranslation();

  const sendMessage = async (data: {
    name: string;
    email: string;
    subject: string;
    phoneNumber: string;
    description: string;
  }) => {
    setLoading(true);
    const result = await sendMessageService(data);
    setLoading(false);
    if (result?.type?.includes('error') || result?.status === 'error') {
      setErrorMsg(t('generalError'));
    } else {
      setShowSuccessMessage(true);
    }
  };

  useEffect(() => {
    if (!contactUsVisible) setShowSuccessMessage(false);
  }, [contactUsVisible]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {!showSuccessMessage && (
          <View style={styles.closingHeader}>
            <Pressable
              onPress={closeContactUs}
              style={[
                styles.iconContainer,
                i18n.language === 'ar' && {transform: [{scaleX: -1}]},
              ]}>
              <ArrowIcon width={32} height={32} />
            </Pressable>
          </View>
        )}

        {showSuccessMessage && contactUsVisible ? (
          <View style={styles.successContainer}>
            <View
              style={{
                marginTop: '40%',
                justifyContent: 'center',
              }}>
              <Image
                source={Images.true}
                style={{width: 95, height: 95, alignSelf: 'center'}}
                resizeMode="contain"
              />
              <Text color={Color.White} size={17} bold center mt={21} mb={31}>
                {t('auth.succSendMessage')}
              </Text>
              <Pressable
                onPress={() => {
                  closeButtonAction?.() || closeContactUs();
                }}>
                <GradientView style={styles.sendButton}>
                  <Text color={Color.White} size={17} light>
                    {t('buttons.close')}
                  </Text>
                </GradientView>
              </Pressable>
            </View>
          </View>
        ) : (
          <>
            {loading && <Loader transparent />}

            <Text size={28} mt={24} mb={8} bold color={Color.White}>
              {t('contactUs')}
            </Text>
            <Text
              size={13}
              mb={24}
              color={Color.White}
              style={{
                fontFamily:
                  i18n.language === 'ar'
                    ? 'TheSansArabic-Plain'
                    : 'OpenSans-Light',
              }}>
              {t('contactUsDesc')}
            </Text>
            <Controller
              control={control}
              rules={{
                required: t('errorMessage.required'),
                validate: value => {
                  return (
                    /^[\p{Letter}\p{Mark}\s]+$/u.test(value) ||
                    t('errorMessage.nameLettersOnly')
                  );
                },
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  label={t('auth.name')}
                  placeholder={t('auth.nameHolder')}
                  required
                  errorMsg={errors?.name?.message}
                />
              )}
              name="name"
            />
            <Controller
              control={control}
              rules={{
                required: t('errorMessage.required'),
                validate: value => {
                  return (
                    validator.isEmail(value) || t('errorMessage.invalidEmail')
                  );
                },
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  label={t('auth.email')}
                  placeholder={t('auth.email')}
                  required
                  errorMsg={errors.email?.message}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{
                validate: value => {
                  return (
                    validator.isEmpty(value?.trim()) ||
                    validator.isMobilePhone(value) ||
                    t('errorMessage.invalidPhone')
                  );
                },
              }}
              render={({field: {onChange, value}}) => {
                console.log(value, 'present vall');
                return (
                  <TextInput
                    phoneTextInput={true}
                    onChangeText={onChange}
                    value={value}
                    label={t('auth.phoneNumber')}
                    placeholder={t('auth.phonNumOnly')}
                    errorMsg={errors.phoneNumber?.message}
                  />
                );
              }}
              name="phoneNumber"
            />
            <Controller
              control={control}
              rules={{
                required: t('errorMessage.required'),
                validate: value => {
                  return (
                    validator.isEmpty(value?.trim()) ||
                    /^[\p{Letter}\p{Mark}\p{N}\s]+$/u.test(value) ||
                    t('errorMessage.alphaNumOnly')
                  );
                },
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  required
                  label={t('auth.subject')}
                  placeholder={t('auth.subject')}
                  errorMsg={errors.subject?.message}
                />
              )}
              name="subject"
            />

            <Controller
              control={control}
              rules={{
                required: t('errorMessage.required'),
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  required
                  label={t('auth.description')}
                  placeholder={t('auth.descriptionHolder')}
                  multiline={true}
                  style={styles.descInput}
                  errorMsg={errors.description?.message}
                />
              )}
              name="description"
            />
            {errorMsg !== '' && (
              <Text color={Color.DarkRed} mt={8} mb={8}>
                {errorMsg}
              </Text>
            )}
            <Pressable onPress={handleSubmit(sendMessage)}>
              <GradientView style={styles.sendButton}>
                <Text color={Color.White} size={17} light>
                  {t('send')}
                </Text>
              </GradientView>
            </Pressable>
          </>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  closingHeader: {
    alignItems: 'flex-start',
    marginBottom: 30,
    width: '100%',
  },
  container: {
    backgroundColor: Color.DarkGunMetal,
    flex: 1,
    paddingHorizontal: 24,
  },
  descInput: {
    maxHeight: 200,
    minHeight: 100,
    padding: 15,
    paddingTop: 15,
    textAlignVertical: 'top',
  },

  iconContainer: {
    marginTop: 40,
    zIndex: 10,
  },
  sendButton: {
    alignItems: 'center',
    borderRadius: 16,
    justifyContent: 'center',
    marginBottom: 50,
    paddingVertical: 12,
  },

  successContainer: {alignItems: 'center'},
});
