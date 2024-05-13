/* eslint-disable sonarjs/cognitive-complexity */
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React, {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

import ArrowIcon from '@/src/app/assets/icons/arrow-left.svg';
import ArrowIconDark from '@/src/app/assets/icons/arrow-left-dark.svg';
import BackArrow from '@/src/app/assets/icons/backArrow.svg';
import {Images} from '@/src/app/assets/images';
import {GradientView, Modal, Text, View, Image} from '@/src/common/components';
import {Route} from '@/src/navigation/routes';
import {Color, TextSize} from '@/src/theme/const';

import {Profile} from './Profile';

export interface HeaderProps {
  goBack?: boolean;
  onBackPress?: () => void;
  title?: string;
  sectorBg?: ImageSourcePropType;
  bgImageSrc?: ImageSourcePropType;
  hideBackground?: boolean;
  customHeight?: number | string;
  showGif?: boolean;
  darkIcon?: boolean;
  isGradient?: boolean;
  register?: boolean;
  gradientColors?: [string];
  customContainerTitleStyle?: ViewStyle;
  customTitleStyle?: TextStyle;
  backWithText?: boolean;
  customHeaderStyle?: ViewStyle;
}
export const Header = memo<HeaderProps>(
  ({
    goBack,
    title,
    onBackPress,
    showGif = false,
    sectorBg,
    bgImageSrc,
    hideBackground = false,
    customHeight,
    darkIcon,
    backWithText,
    isGradient,
    register,
    customContainerTitleStyle,
    customTitleStyle,
    customHeaderStyle,
  }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isProfileVisible, setIsProfileVisible] = useState(false);

    const {i18n} = useTranslation();
    const navigation = useNavigation();

    const MainComp: React.ComponentType<any> = isGradient ? GradientView : View;

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const handleProfileModal = () =>
      setIsProfileVisible(() => !isProfileVisible);
    const handleRegisterNavigation = () =>
      navigation.navigate(Route.REGISTER as never);
    const renderLeftIcon = () => {
      return (
        <Pressable
          onPress={onBackPress}
          style={[
            styles.arrow,
            i18n.language === 'ar' && {transform: [{scaleX: -1}]},
          ]}>
          {darkIcon ? (
            <ArrowIconDark width={32} height={32} />
          ) : (
            <ArrowIcon width={32} height={32} />
          )}
        </Pressable>
      );
    };

    const renderBackWithText = () => {
      return (
        <Pressable onPress={onBackPress} style={styles.arrowWithText}>
          <>
            <View style={i18n.language === 'ar' && {transform: [{scaleX: -1}]}}>
              <BackArrow height={17} width={10} />
            </View>
            <Text light importantStyle={styles.backTxt}>
              {t('back')}
            </Text>
          </>
        </Pressable>
      );
    };

    return (
      <MainComp
        style={[
          styles.header,
          goBack && styles.stackHeaderStyle,
          hideBackground && styles.headerHight,
          !!customHeight && {height: customHeight},
          customHeaderStyle,
          isGradient && styles.linearGradientStyle,
        ]}>
        {showGif ? (
          <Image
            source={Images.headerImg}
            style={[
              styles.backgroundVideo,
              i18n.language === 'ar' && {transform: [{scaleX: -1}]},
            ]}
            resizeMode="cover"
          />
        ) : (
          !hideBackground && (
            <Image
              style={[
                styles.gif,
                i18n.language === 'ar' && {transform: [{scaleX: -1}]},
              ]}
              resizeMode="cover"
              source={{uri: bgImageSrc} || sectorBg || Images.Enabler}
            />
          )
        )}
        {goBack && renderLeftIcon()}
        {backWithText && renderBackWithText()}
        <View
          style={register ? styles.headerRegister : styles.headerNoRegister}>
          {register && (
            <Pressable
              style={styles.topContainer}
              onPress={handleRegisterNavigation}>
              <Image
                source={Images.profileCircle}
                style={{width: 28, height: 28}}
                resizeMode="cover"
              />
            </Pressable>
          )}
          {title && (
            <View
              style={[
                styles.title,
                !!customHeight && {justifyContent: 'flex-start'},
                customContainerTitleStyle,
              ]}>
              <Text
                size={34}
                color={Color.White}
                style={styles.text}
                importantStyle={customTitleStyle}>
                {title}
              </Text>
            </View>
          )}
          {!goBack && !backWithText && (
            <View style={styles.topContainer}>
              <Pressable onPress={handleProfileModal}>
                <Image
                  source={Images.languageCircle}
                  style={{width: 22, height: 22}}
                  resizeMode="cover"
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate(Route.Notifications as never);
                }}>
                <Image
                  source={Images.notification}
                  style={{
                    width: 30,
                    height: 25,
                    marginLeft: 15,
                    marginBottom: 2,
                  }}
                  resizeMode="cover"
                />
              </Pressable>
            </View>
          )}
        </View>

        {showGif && (
          <View style={styles.contentContainer}>
            <Image
              resizeMode="contain"
              source={Images.logo}
              style={styles.logo}
            />
          </View>
        )}

        <Modal isVisible={isModalVisible}>
          <Modal.Container>
            <Modal.ClosingHeader
              onClosePress={handleModal}
              title="Notifications"
            />
            <Modal.Body>
              <Text>notification list will go there</Text>
            </Modal.Body>
          </Modal.Container>
        </Modal>

        <Modal isVisible={isProfileVisible}>
          <Modal.Container>
            <Modal.Body>
              <Profile onClosePress={handleProfileModal} />
            </Modal.Body>
          </Modal.Container>
        </Modal>
      </MainComp>
    );
  },
);

const styles = StyleSheet.create({
  arrow: {
    left: 24,
    position: 'absolute',
    top: 50,
    zIndex: 100,
  },
  arrowWithText: {
    flexDirection: 'row',
    marginStart: 24,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  backTxt: {
    color: Color.White,
    fontSize: 12,
    marginHorizontal: 6.5,
  },
  backgroundVideo: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },

  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: '9%',
  },
  gif: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  header: {
    backgroundColor: Color.White,
    elevation: 0,
    height: 300,
    overflow: 'hidden',
  },
  headerHight: {
    height: Platform.OS === 'ios' ? 120 : 90,
  },

  headerNoRegister: {
    alignSelf: 'center',
    width: '80%',
  },
  headerRegister: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    width: Dimensions.get('screen').width,
  },
  linearGradientStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  logo: {
    height: 69,
    width: '28%',
  },
  stackHeaderStyle: {
    height: 312,
  },
  text: {
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  title: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
  },
});
