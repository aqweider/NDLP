import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { Text, View } from '@/src/common/components';
import { Color } from '@/src/theme/const';

export type Props = {
  stepsList: any;
};

export const InvestorJournyCard: FC<Props> = ({ stepsList }: Props) => {
  console.log(stepsList);
  const onSwipeLeft = () => {
    console.log({ myText: 'Yooou swiped left!' });
  };

  const onSwipeRight = () => {
    console.log({ myText: 'You swiped right!' });
  };

  return (
    <Swipeable
      onSwipeableRightOpen={onSwipeRight}
      onSwipeableLeftOpen={onSwipeLeft}>
      <View style={styles.container}>
        <Text color={Color.Black}>{stepsList[0].title}</Text>
      </View>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: Color.Black,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'row',
    height: 350,
    padding: 15,
    width: '100%',
  },
});
