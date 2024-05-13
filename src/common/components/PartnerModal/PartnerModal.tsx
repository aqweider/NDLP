import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {GradientView} from '@/src/common/components';
import {Color} from '@/src/theme/const';

import {Text} from '../Text';
import {Image} from '../Image';
export type Props = {
  onPress: () => void;
  selectedPartner: Partner;
};
export const PartnerModal: FC<Props> = ({onPress, selectedPartner}: Props) => {
  const {t} = useTranslation();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={selectedPartner.modalLogo}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text bold size={28} color={Color.White} mt={8} mb={8}>
          {selectedPartner.name}
        </Text>
        <Text color={Color.White} size={15} mb={16}>
          {selectedPartner.info}
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <Pressable onPress={onPress}>
          <GradientView style={styles.linearGradient}>
            <Text style={styles.buttonLabel}>{t('VisitWebsite')}</Text>
          </GradientView>
        </Pressable>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  buttonLabel: {
    color: Color.White,
    fontFamily: 'TheSansArabic-Plain',
    fontSize: 17,
    textAlign: 'center',
  },
  container: {
    backgroundColor: Color.Jacarta,
    flexGrow: 1,
    paddingBottom: 70,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  footerContainer: {
    marginTop: 14,
    paddingHorizontal: 16,
  },
  image: {
    height: 64,
    width: 64,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  linearGradient: {
    borderRadius: 24,
    paddingVertical: 12,
  },
});
