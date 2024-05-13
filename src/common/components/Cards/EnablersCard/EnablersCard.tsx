import React, {FC} from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {GradientView, Text, View, Image} from '@/src/common/components';
import {Color} from '@/src/theme/const';

export type EnablersCardProps = {
  item: any;
  cardStyle?: ViewStyle;
  carouselButton?: boolean;
  onPress?: () => void;
};
export const EnablersCard: FC<EnablersCardProps> = ({
  item,
  cardStyle,
  carouselButton,
  onPress,
  ...props
}: EnablersCardProps) => {
  const Button = carouselButton ? TouchableWithoutFeedback : Pressable;
  return (
    <Button style={[styles.container, cardStyle]} onPress={onPress} {...props}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item.imageSrc ? item.imageSrc : item.img}}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <GradientView style={styles.textContainer}>
        <Text light color={Color.White} size={15}>
          {item.name}
        </Text>
      </GradientView>
    </Button>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    borderRadius: 16,
    elevation: 4,
    height: 220,
    overflow: 'hidden',
    shadowColor: Color.Black,
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    width: '48%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 120,
    overflow: 'hidden',
  },
  textContainer: {
    alignItems: 'flex-start',
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingBottom: 5
  },
});
