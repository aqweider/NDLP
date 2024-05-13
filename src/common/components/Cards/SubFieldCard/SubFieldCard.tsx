import React, {FC} from 'react';
import {ImageSourcePropType, Pressable, StyleSheet} from 'react-native';

import {Button, Text, View, Image} from '@/src/common/components';
import {Color} from '@/src/theme/const';

export type SubFieldCardProps = {
  imageSrc: ImageSourcePropType;
  title: string;
  subTitle: string;
  onSavePressed: () => void;
  onSharePressed: () => void;
  onCardPressed: () => void;
};
export const SubFieldCard: FC<SubFieldCardProps> = ({
  imageSrc,
  title,
  subTitle,
  onSavePressed,
  onSharePressed,
  onCardPressed,
}: SubFieldCardProps) => {
  return (
    <Pressable style={styles.container} onPress={onCardPressed}>
      <View style={styles.imageContainer}>
        <Image
          source={imageSrc}
          width={100}
          height={100}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text size={20} bold color={Color.Black}>
          {title}
        </Text>
        <Text size={18} color={Color.Black}>
          {subTitle}
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            title="SAVE"
            onPress={onSavePressed}
            style={styles.button}
            iconName="close"
            iconType="AntDesign"
          />
          <Button
            title="SHARE"
            onPress={onSharePressed}
            style={styles.button}
            iconName="close"
            iconType="AntDesign"
          />
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: Color.White,
    justifyContent: 'center',
    padding: 15,
    width: '100%',
  },
  button: {
    backgroundColor: Color.Black,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: Color.Grey,
    borderColor: Color.Black,
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 10,
    overflow: 'hidden',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    height: 160,
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
});
