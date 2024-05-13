import React, {FC, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

// import {SectorsImages} from '@/src/app/assets/images/sectors';
import {Text, View, Image} from '@/src/common/components';
import {Color} from '@/src/theme/const';

const Capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export type SectorsCardProps = {
  item: any;
};
export const SectorsFullCard: FC<SectorsCardProps> = ({
  item,
}: SectorsCardProps) => {
  const {t, i18n} = useTranslation();

  // const renderImage = useCallback(() => {
  //   switch (item.id) {
  //     case 0: {
  //       return (
  //         <Image
  //           source={SectorsImages.MiningSector}
  //           style={[
  //             styles.background,
  //             i18n.language === 'ar' && {transform: [{scaleX: -1}]},
  //           ]}
  //         />
  //       );
  //       break;
  //     }
  //     case 1: {
  //       return (
  //         <Image
  //           source={SectorsImages.IndustrySector}
  //           style={[
  //             styles.background,
  //             i18n.language === 'ar' && {transform: [{scaleX: -1}]},
  //           ]}
  //         />
  //       );
  //       break;
  //     }
  //     case 2: {
  //       return (
  //         <Image
  //           source={SectorsImages.LogisticsSector}
  //           style={[
  //             styles.background,
  //             i18n.language === 'ar' && {transform: [{scaleX: -1}]},
  //           ]}
  //         />
  //       );
  //       break;
  //     }
  //     case 3: {
  //       return (
  //         <Image
  //           source={SectorsImages.EnergySector}
  //           style={[
  //             styles.background,
  //             i18n.language === 'ar' && {transform: [{scaleX: -1}]},
  //           ]}
  //         />
  //       );
  //       break;
  //     }
  //   }
  // }, [i18n.language, item.id]);
  return (
    <View style={styles.container}>
      {/* {renderImage()} */}
      <View style={styles.textContainer}>
        <Text bold color={Color.White} size={i18n.language === 'ar' ? 28 : 32}>
          {Capitalize(item.name)}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    borderRadius: 16,
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
  },
  container: {
    // borderRadius: 16,
    // elevation: 5,
   height: 200,
    // marginTop: 2,
    // shadowColor: Color.Black,
    // shadowOffset: {
    //   width: 0,
    //   height: -3,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    width: '100%',
  },
  textContainer: {
    alignItems: 'center',
    bottom: 32,
    justifyContent: 'center',
    left: 16,
    maxWidth: 400,
    position: 'absolute',
  },
});
