/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable sonarjs/no-duplicate-string */
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  I18nManager,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import validator from 'validator';

import ArrowIcon from '@/src/app/assets/icons/arrow-left.svg';
import { Images } from '@/src/app/assets/images';
import { registerUser } from '@/src/app/services/user';
import {
  Button,
  Container,
  GradientButton,
  Loader,
  Modal,
  Sheet,
  Text,
  TextInput,
  View,
} from '@/src/common/components';
import { ContactUsModal } from '@/src/common/components/ProfileComponents';
import { Route } from '@/src/navigation/routes';
import { Color } from '@/src/theme/const';
import {UseGetHomeDataApi} from '@/src/app/store/useHome';

type registerData = {
  targetedSector: string[];
  firstName: string;
  lastName: string;
  organizationName: string;
  position: string;
  projectBrief: string;
  email: string;
  phoneNumber: string;
};
export const Register = ({ navigation }: any) => {
  const {homeData, homeDataError, homeDataLoading} = UseGetHomeDataApi();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      organizationName: '',
      position: '',
      targetedSector: [],
      projectBrief: '',
      email: '',
      phoneNumber: '',
    },
  });

  const sectorData = homeData?.sectors?.content;

  const [loading, setLoading] = useState(false);
  const [showRegSuccess, setShowRegSuccess] = useState(false);
  const [contactUsVisible, setContactUsVisible] = useState(false);
  const [closeRegister, setCloseRegister] = useState(false);

  const { t, i18n } = useTranslation();

  const registerNewUser = async (data: registerData) => {
    setLoading(true);

    const response = await registerUser(data);
    if (response.status) {
      setShowRegSuccess(true);
    } else {
      console.log('err');
    }
    setLoading(false);
  };

  useEffect(() => {
    !contactUsVisible && closeRegister && navigation.goBack();
  }, [closeRegister, contactUsVisible]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        {loading && <Loader transparent />}

        {!showRegSuccess && (
          <View style={styles.closingHeader}>
            <Pressable
              onPress={navigation.goBack}
              style={[
                styles.iconContainer,
                i18n.language === 'ar' && { transform: [{ scaleX: -1 }] },
              ]}>
              <ArrowIcon width={32} height={32} />
            </Pressable>
          </View>
        )}

        {showRegSuccess ? (
          <View
            style={{
              marginTop: '40%',
              justifyContent: 'center',
            }}>
            <Image
              source={Images.true}
              style={{ width: 95, height: 95, alignSelf: 'center' }}
              resizeMode="contain"
            />
            <Text color={Color.White} size={17} bold center mt={21} mb={31}>
              {t('auth.joinThank')}
            </Text>
          </View>
        ) : (
          <>
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
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  label={t('auth.firstName')}
                  placeholder={t('auth.firstNameHolder')}
                  required
                  errorMsg={errors?.firstName?.message}
                />
              )}
              name="firstName"
            />
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
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  label={t('auth.lastName')}
                  placeholder={t('auth.lastNameHolder')}
                  required
                  errorMsg={errors.lastName?.message}
                />
              )}
              name="lastName"
            />
            <Controller
              control={control}
              rules={{
                validate: value => {
                  return (
                    validator.isEmpty(value?.trim()) ||
                    /^[\p{Letter}\p{Mark}\s]+$/u.test(value) ||
                    t('errorMessage.fieldLettersOnly')
                  );
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  label={t('auth.organizationName')}
                  placeholder={t('auth.organizationHolder')}
                  errorMsg={errors.organizationName?.message}
                />
              )}
              name="organizationName"
            />
            <Controller
              control={control}
              rules={{
                validate: value => {
                  return (
                    validator.isEmpty(value?.trim()) ||
                    /^[\p{Letter}\p{Mark}\s]+$/u.test(value) ||
                    t('errorMessage.fieldLettersOnly')
                  );
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  label={t('auth.position')}
                  placeholder={t('auth.positionHolder')}
                  errorMsg={errors.position?.message}
                />
              )}
              name="position"
            />
            <View style={{ flexDirection: 'row' }}>
              <Text
                color={Color.White}
                size={18}
                mb={12}
                style={{ marginHorizontal: 4 }}>
                {t('auth.targetedSector')}
              </Text>
              <Text size={20} color={Color.Pigment}>
                *
              </Text>
            </View>
            <View style={{ marginBottom: 24 }}>
              <Controller
                control={control}
                rules={{
                  validate: value => {
                    return value.length > 0 ? true : t('errorMessage.required');
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    style={[
                      styles.boxStyle,
                      !!errors.targetedSector?.message && {
                        borderColor: Color.Pigment,
                        borderWidth: 1,
                      },
                    ]}
                    placeholderStyle={styles.selectedInput}
                    selectedTextStyle={styles.selectedInput}
                    containerStyle={styles.dropdownStyle}
                    itemTextStyle={styles.selectedInput}
                    selectedStyle={{ backgroundColor: Color.Jacarta }}
                    data={sectorData}
                    maxHeight={300}
                    labelField="name"
                    valueField="name"
                    fontFamily="TheSansArabic-Plain"
                    placeholder={t('auth.targetedSectorHolder')}
                    value={value}
                    activeColor={Color.DarkGunMetal2}
                    onChange={item => {
                      onChange(item);
                    }}
                    renderLeftIcon={() => <View />}
                    renderRightIcon={() => <View />}
                  />
                )}
                name="targetedSector"
              />
              {errors.targetedSector?.message && (
                <Text size={12} color={Color.Pigment} mt={5}>
                  {' '}
                  {errors.targetedSector?.message}
                </Text>
              )}
            </View>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  label={t('auth.projectBrief')}
                  placeholder={t('auth.projectBriefHolder')}
                  multiline
                  style={{
                    padding: 15,
                    paddingTop: 15,
                    textAlignVertical: 'top',
                    minHeight: 100,
                    maxHeight: 200,
                  }}
                  errorMsg={errors.projectBrief?.message}
                />
              )}
              name="projectBrief"
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
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  label={t('auth.email')}
                  placeholder={t('auth.emailHolder')}
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
              render={({ field: { onChange, value } }) => (
                <TextInput
                  phoneTextInput={true}
                  onChangeText={onChange}
                  value={value}
                  label={t('auth.phoneNumber')}
                  placeholder={t('auth.phoneNumberHolder')}
                  errorMsg={errors.phoneNumber?.message}
                />
              )}
              name="phoneNumber"
            />
          </>
        )}
        <GradientButton
          label={showRegSuccess ? t('buttons.close') : t('auth.register')}
          customStyle={{ paddingVertical: 12 }}
          textStyle={{ fontSize: 18 }}
          onPress={
            showRegSuccess
              ? () => {
                  navigation.navigate(Route.EXPLORE);
                  // setShowRegSuccess(false);
                  reset();
                }
              : handleSubmit(registerNewUser)
          }
        />
        {!showRegSuccess && (
          <Button
            title={t('contactUs')}
            style={{ backgroundColor: Color.Transparent }}
            customTitleStyle={styles.contactusBtn}
            textColor={Color.White}
            onPress={() => setContactUsVisible(true)}
          />
        )}

        <Modal isVisible={contactUsVisible}>
          <Modal.Container>
            <Modal.Body>
              <ContactUsModal
                contactUsVisible={contactUsVisible}
                closeContactUs={() => {
                  setContactUsVisible(false);
                }}
                closeButtonAction={() => {
                  setContactUsVisible(false);
                  setCloseRegister(true);
                }}
              />
            </Modal.Body>
          </Modal.Container>
        </Modal>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  boxStyle: {
    backgroundColor: Color.Jacarta,
    borderRadius: 16,
    borderWidth: 0,
    margin: 0,
    marginHorizontal: 2,
    minHeight: 50,
    paddingHorizontal: 8,
    paddingVertical: 12,
    width: '100%',
  },
  closingHeader: {
    alignItems: 'flex-start',
    marginBottom: 40,
    width: '100%',
  },
  contactusBtn: {
    fontFamily: I18nManager.isRTL ? 'TheSansArabic-Plain' : 'OpenSans-Light',
    fontSize: 17,
    marginBottom: 30,
    textDecorationLine: 'underline',
  },
  container: {
    backgroundColor: Color.DarkGunMetal,
    flex: 1,
    paddingHorizontal: 24,
  },
  dropdownStyle: {
    backgroundColor: Color.Jacarta,
  },

  iconContainer: {
    marginTop: 40,
    zIndex: 10,
  },

  selectedInput: {
    color: Color.White,
    fontSize: 17,
    textAlign: 'left',
  },
});
