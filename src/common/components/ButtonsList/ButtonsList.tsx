import React, { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import Building2IconActive from '@/src/app/assets/icons/buildings-2@3x.svg';
import BuildingIconActive from '@/src/app/assets/icons/buliding@3x.svg';
import CpuIconActive from '@/src/app/assets/icons/cpu@3x.svg';
import EditIconActive from '@/src/app/assets/icons/edit@3x.svg';
import MoneyIconActive from '@/src/app/assets/icons/moneys@3x.svg';
import PeopleIconActive from '@/src/app/assets/icons/people@3x.svg';
import ShipIconActive from '@/src/app/assets/icons/ship@3x.svg';
import StatusIconActive from '@/src/app/assets/icons/status-up@3x.svg';
import { GradientView, Text, View } from '@/src/common/components';
import { Color } from '@/src/theme/const';

export type Props = {
  list: any;
  setSelected: Dispatch<SetStateAction<any>>;
  selectedId?: number;
};
export const ButtonsList: FC<Props> = ({
  list,
  setSelected,
  selectedId = 0,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(selectedId);
  const flatListRef = useRef<FlatList>(null);
  const handleButtonPress = (item: any, index: number) => {
    setSelectedIndex(index);
    setSelected(item);
  };
  const { i18n } = useTranslation();
  // eslint-disable-next-line sonarjs/cognitive-complexity
  const renderButton = ({ item, index }: any) => {
    let Icon;
    switch (item.id) {
      case 0: {
        Icon = <EditIconActive width={16} height={16} />;

        break;
      }
      case 1: {
        Icon = <MoneyIconActive width={16} height={16} />;

        break;
      }
      case 2: {
        Icon = <Building2IconActive width={16} height={16} />;

        break;
      }
      case 3: {
        Icon = <PeopleIconActive width={16} height={16} />;

        break;
      }
      case 4: {
        Icon = <BuildingIconActive width={16} height={16} />;

        break;
      }
      case 5: {
        Icon = <StatusIconActive width={16} height={16} />;

        break;
      }
      case 6: {
        Icon = <ShipIconActive width={16} height={16} />;

        break;
      }
      case 7: {
        Icon = <CpuIconActive width={16} height={16} />;

        break;
      }
    }
    return (
      <View style={styles.container}>
        <Pressable onPress={() => handleButtonPress(item, index)}>
          <GradientView
            style={[
              styles.button,
              selectedIndex === index
                ? styles.Activebutton
                : styles.inActiveButton,
            ]}
            {...(selectedIndex !== index && {
              colors: [Color.Jacarta, Color.Jacarta],
            })}>
            <View style={styles.icon}>
              {Icon}
              </View>

            <Text
              color={Color.White}
              style={{
                fontFamily:
                  i18n.language === 'ar'
                    ? 'TheSansArabic-Plain'
                    : 'OpenSans-Light',
              }}>
              {item.name}
            </Text>
          </GradientView>
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={list}
        getItemLayout={(data, index) => ({
          length: 200,
          offset: 200 * index - 1,
          index,
        })}
        // initialScrollIndex={selectedId}
        renderItem={renderButton}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Activebutton: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 16,
    width: '100%',
  },
  contentContainerStyle: {
    paddingLeft: 24,
  },
  icon: {
    marginRight: 10,
  },
  inActiveButton: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
});
