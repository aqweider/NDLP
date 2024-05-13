import React, {FC} from 'react';
import {ImageSourcePropType, Pressable, StyleSheet} from 'react-native';

import {Text, View, Image} from '@/src/common/components';
import {Color} from '@/src/theme/const';

export type NewaCardProps = {
  imageSrc: ImageSourcePropType;
  description: string;
  onCardPressed: () => void;
};
export const NewsCard: FC<NewaCardProps> = ({
  imageSrc,
  description,
  onCardPressed,
}: NewaCardProps) => {
  return (
    <Pressable style={styles.container} onPress={onCardPressed}>
      <View style={styles.imageContainer}>
        <Image source={imageSrc} resizeMode="contain" style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text light color={Color.Black} size={14} mt={10}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteGrey,
    borderRadius: 16,
    height: 188,
    marginRight: 16,
    overflow: 'hidden',
    width: 292,
  },
  image: {
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
