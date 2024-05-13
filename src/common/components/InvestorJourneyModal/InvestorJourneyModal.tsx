import 'react-native-get-random-values';

import React, {FC} from 'react';
import {I18nManager, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {Color, FontFamily} from '@/src/theme/const';

import {GradientButton} from '../GradientButton';
import {Text} from '../Text';

export type Props = {
  onPress: (url: string) => void;
  selectedJouney: InvestorsJourney;
};
export const InvestorJourneyModal: FC<Props> = ({
  onPress,
  selectedJouney,
}: Props) => {
  const renderContentPoints = (points: Array<string>) => {
    return points.map((item: string) => {
      return (
        <View key={item} style={styles.pointRow}>
          <View style={styles.bullet} />

          <Text size={15} color={Color.White} importantStyle={styles.fontStyle}>
            {item}
          </Text>
        </View>
      );
    });
  };

  const renderSections = () => {
    return selectedJouney.content?.map((item: JourneyContentProps) => {
      return (
        <View key={item.name}>
          {!!item.nameIn && (
            <Text bold size={28} mb={2} mt={22} color={Color.White}>
              {item.nameIn}
            </Text>
          )}
          {!!item.name && ( 
            <Text color={Color.White} size={22} mt={16} bold mb={8}>
              {item.name}
            </Text>
          )}
          {!!item.text && (
            <Text
              color={Color.White}
              size={15}
              mb={16}
              importantStyle={styles.fontStyle}>
              {item.text}
            </Text>
          )}
          {!!item.list && renderContentPoints(item.list)}
          {!!item.textDone && (
            <Text color={Color.White} size={15} mb={16}>
              {item.textDone}
            </Text>
          )}
          {/* {!!item.link && !!item.link[0].value && (
            <GradientButton
              key={item.name}
              label={item.name}
              onPress={() => onPress(item.link.value ? item.link.value : '')}
              customStyle={styles.button}
              textStyle={styles.btnText}
            />
          )} */}
          {item.link.map((item, index) => {
            if(!!item.name) {
              return(
                <GradientButton
                key={item.name}
                label={item.name}
                onPress={() => onPress(item.value ? item.value : '')}
                customStyle={styles.button}
                textStyle={styles.btnText}
              />
              );
            }    
          })}
        </View>
      );
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedJouney && (
        <View style={styles.contentContainer}>
          <Text mt={48} mb={3}>
            <Text bold size={28} color={Color.White}>
              {selectedJouney.nameIn}
            </Text>
            {!!selectedJouney.condition && (
              <Text size={22} color={Color.White}>
                ({selectedJouney.condition})
              </Text>
            )}
          </Text>
          {!!selectedJouney.content && renderSections()}
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  btnText: {
    fontFamily: I18nManager.isRTL
      ? FontFamily.default
      : FontFamily.openSansLight,
    fontSize: 17,
  },
  bullet: {
    backgroundColor: Color.White,
    borderRadius: 4,
    height: 4,
    marginRight: 5,
    marginTop: 10,
    width: 4,
  },
  button: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  container: {flexGrow: 1, paddingBottom: 70},
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  fontStyle: {
    fontFamily: I18nManager.isRTL
      ? FontFamily.default
      : FontFamily.openSansLight,
  },
  pointRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
});
