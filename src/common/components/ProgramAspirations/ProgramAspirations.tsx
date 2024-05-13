import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

import Development from '@/src/app/assets/icons/development.svg';
import DigitalTrans from '@/src/app/assets/icons/digital-transformation.svg';
import Grow from '@/src/app/assets/icons/grow.svg';
import Improve from '@/src/app/assets/icons/improve.svg';
import Job from '@/src/app/assets/icons/job.svg';
import Money from '@/src/app/assets/icons/money-growth.svg';
import Trending from '@/src/app/assets/icons/trending.svg';
import {Images} from '@/src/app/assets/images';
import {Color} from '@/src/theme/const';

import {Text} from '../Text';
import {Image} from '../Image';
export const ProgramAspirations: FC = props => {
  const {data} = props;
  const {t} = useTranslation();
  const renderTextIconRow = (item: {}, index: number) => {
    let Icon;
    switch (index) {
      case 0: {
        Icon = (
          <Image
            source={Images.grow}
            style={styles.growImg}
            resizeMode="cover"
          />
        );
        break;
      }
      case 1: {
        Icon = <Development width={32} height={32} />;
        break;
      }
      case 2: {
        Icon = <Trending width={32} height={32} />;
        break;
      }
      case 3: {
        Icon = <Improve width={32} height={32} />;
        break;
      }
      case 4: {
        Icon = <DigitalTrans width={32} height={32} />;
        break;
      }
      case 5: {
        Icon = <Job width={32} height={32} />;
        break;
      }
      case 6: {
        Icon = <Money width={32} height={32} />;
        break;
      }
    }
    return (
      <View style={styles.textIconContainer}>
        <Image
          source={{uri: item?.image}}
          style={styles.growImg}
          resizeMode="contain"
        />
        <Text
          size={15}
          color={Color.White}
          ml={25}
          style={{flex: 1, flexWrap: 'wrap'}}>
          {item?.title}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text size={28} color={Color.White} bold mb={8} mt={32}>
        {data?.title}
      </Text>
      <Text size={13} color={Color.White} mb={24}>
        {data?.description}
      </Text>
      {data?.aspirations.map((item, index) => {
        return renderTextIconRow(item);
      })}
      {/* {renderTextIconRow(0, t('ProgramAspirationsItem1'))}
      {renderTextIconRow(1, t('ProgramAspirationsItem2'))}
      {renderTextIconRow(2, t('ProgramAspirationsItem3'))}
      {renderTextIconRow(3, t('ProgramAspirationsItem4'))}
      {renderTextIconRow(4, t('ProgramAspirationsItem5'))}
      {renderTextIconRow(5, t('ProgramAspirationsItem6'))}
      {renderTextIconRow(6, t('ProgramAspirationsItem7'))} */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.DarkGunMetal,
    flex: 1,
    width: '100%',
  },
  growImg: {
    height: 40,
    width: 40,
  },
  textIconContainer: {
    alignItems: 'center',
    backgroundColor: Color.Jacarta,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 24,
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
});
