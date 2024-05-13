import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

import {Images} from '@/src/app/assets/images';
import {Text, View, Image} from '@/src/common/components';
import {Color} from '@/src/theme/const';

const Capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export type SectorsCardProps = {
  item: any;
};
export const SectorsCard: FC<SectorsCardProps> = ({item}: SectorsCardProps) => {
  const renderIcon = () => {
    switch (item.id) {
      case 0: {
        return (
          <Image
            // source={{uri: item.image}}
            source={Images.miningIcon}
            resizeMode="contain"
            style={styles.imageIcon}
          />
        );
        break;
      }
      case 1: {
        return (
          <Image
            source={Images.industryIcon}
            resizeMode="contain"
            style={styles.imageIcon}
          />
        );
        break;
      }
      case 2: {
        return (
          <Image
            source={Images.logisticsIcon}
            resizeMode="contain"
            style={styles.imageIcon}
          />
        );
        break;
      }
      case 3: {
        return (
          <Image
            source={Images.energyIcon}
            resizeMode="contain"
            style={styles.imageIcon}
          />
        );
        break;
      }
    }
  };
  const renderBg = () => {
    switch (item.id) {
      case 0: {
        return <Image source={Images.miningBg} style={styles.background} />;
        break;
      }
      case 1: {
        return <Image source={Images.industryBg} style={styles.background} />;
        break;
      }
      case 2: {
        return <Image source={Images.logisticsBg} style={styles.background} />;
        break;
      }
      case 3: {
        return <Image source={Images.energyBg} style={styles.background} />;
        break;
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{uri: item.image}}
        style={styles.background}
        resizeMode={'cover'}
      />
      {/* <Image source={item.imageSrc} style={styles.background} /> */}
      {/* <View style={styles.imageContainer}>{renderIcon()}</View> */}
      <View style={styles.textContainer}>
        <Text bold color={Color.White} size={30}>
          {Capitalize(item.name)}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
  },
  container: {
    borderRadius: 20,
    height: 250,
    overflow: 'hidden',
    width: 203,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 26,
  },
  imageIcon: {
    height: 150,
    width: 150,
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
});
