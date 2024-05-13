import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';

import ArrowIcon from '@/src/app/assets/icons/arrow-right.svg';
import { Text, View } from '@/src/common/components';
import { Color } from '@/src/theme/const';

interface ListProps {
  title: string;
  onPress: () => void;
  borderBottom?: boolean;
  languageText?: boolean;
}
export const ListItem: FC<ListProps> = ({
  title,
  onPress,
  borderBottom,
  languageText,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Pressable
      style={[
        styles.listItemContainer,
        borderBottom && { borderBottomWidth: 1 },
      ]}
      onPress={onPress}>
      <Text color={Color.White} size={17} bold>
        {title}
      </Text>
      <View style={styles.arrow}>
        {languageText && (
          <Text color={Color.whiteGrey} size={13} mr={8}>
            {t('languageShort')}
          </Text>
        )}
        <View style={i18n.language === 'ar' && { transform: [{ scaleX: -1 }] }}>
          <ArrowIcon width={16} height={16} />
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  arrow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  listItemContainer: {
    alignItems: 'center',
    borderColor: Color.Background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});
