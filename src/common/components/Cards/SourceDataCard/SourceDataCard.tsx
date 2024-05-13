import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {ImageSourcePropType, Linking, StyleSheet, Image} from 'react-native';

import {GradientButton, Text, View} from '@/src/common/components';
import {Color} from '@/src/theme/const';

export type SourceDataCardProps = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  link: string;
};
export const SourceDataCard: FC<SourceDataCardProps> = React.memo(
  ({image, title, description, link}: SourceDataCardProps) => {
    const {t} = useTranslation();
        
    return (
      <View style={styles.container}>
        <Image source={{uri: image}} style={styles.img} resizeMode="contain" />
        <View style={styles.content}>
          <View style={{paddingHorizontal: 15}}>
            <Text bold style={styles.title}>
              {title}
            </Text>
            <Text light style={styles.description}>
              {description}
            </Text>
          </View>

          <GradientButton
            label={t('moreDetails')}
            onPress={() => Linking.openURL(link)}
            textStyle={styles.buttonLabel}
            customStyle={styles.button}
          />
        </View>
      </View>
    );
  },
);
const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  buttonLabel: {fontFamily: 'TheSansArabic-Bold'},
  container: {
    alignItems: 'center',
    backgroundColor: Color.Jacarta,
    borderRadius: 12,
    height: 430,
    marginBottom: 16,
    width: '100%',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: 22,
  },
  description: {
    color: Color.White,
    marginBottom: 8,
    opacity: 0.75,
    textAlign: 'center',
  },
  img: {
    height: 80,
    marginBottom: 25,
    marginTop: 35,
    width: '70%',
  },
  title: {
    alignSelf: 'center',
    color: Color.White,
    fontSize: 16,
    marginBottom: 13,
  },
});
