import React, { FC } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/src/common/components';
import { Color } from '@/src/theme/const';

export type Props = {
  list: any;
};
export const SpecificEnablementList: FC<Props> = ({ list }: Props) => {
  const renderCard = ({ item }: any) => {
    return (
      <View style={styles.container}>
        <Text bold color={Color.Black} size={20}>
          {item.title}
        </Text>
        <Text light color={Color.Black} size={14} mt={10}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={list}
        renderItem={renderCard}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: Color.Black,
    borderRadius: 10,
    borderWidth: 2,
    height: 170,
    marginRight: 20,
    marginVertical: 10,
    padding: 15,
    width: 300,
  },
});
