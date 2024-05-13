import React, { FC } from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { Icon, Text, View } from '@/src/common/components';
import { Icons } from '@/src/common/components/Icon/Icon';
import { Color } from '@/src/theme/const';

interface Props extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  outlined?: boolean;
  textColor?: string;
  iconName?: string;
  iconType?: keyof typeof Icons;
  iconColor?: string;
  customTitleStyle?: TextStyle;
}
const ButtonContent = (
  title: string,
  iconName?: string,
  iconType?: keyof typeof Icons,
  outlined?: boolean,
  textColor?: string,
  iconColor?: string,
  customTitleStyle?: TextStyle,
) => {
  return (
    <>
      {iconType && iconName && (
        <Icon
          name={iconName}
          type={iconType}
          size={20}
          color={iconColor || Color.White}
          style={styles.icon}
        />
      )}
      <Text
        style={styles.text}
        bold
        color={textColor || (outlined ? Color.Black : Color.White)}
        size={17}
        importantStyle={customTitleStyle}>
        {title}
      </Text>
    </>
  );
};
export const Button: FC<Props> = ({
  title,
  onPress,
  disabled,
  outlined,
  style,
  textColor,
  iconName,
  iconType,
  iconColor,
  customTitleStyle,
  ...restProps
}: Props) => {
  return disabled ? (
    <View
      style={[
        outlined ? styles.outlinedDisabledButton : styles.disabledButton,
        style,
        iconName ? styles.iconNameStyle : undefined,
      ]}
      {...restProps}>
      {ButtonContent(
        title,
        iconName,
        iconType,
        outlined,
        textColor,
        iconColor,
        customTitleStyle,
      )}
    </View>
  ) : (
    <TouchableOpacity
      style={[
        outlined ? styles.outlinedButton : styles.button,
        style,
        iconName ? styles.iconNameStyle : undefined,
      ]}
      onPress={onPress}
      {...restProps}>
      {ButtonContent(
        title,
        iconName,
        iconType,
        outlined,
        textColor,
        iconColor,
        customTitleStyle,
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Color.Primary,
    borderRadius: 16,
    elevation: 4,
    paddingVertical: 12,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  disabledButton: {
    alignItems: 'center',
    backgroundColor: Color.Grey,
    borderRadius: 16,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 10,
  },
  iconNameStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  outlinedButton: {
    alignItems: 'center',
    borderColor: Color.Primary,
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 12,
  },
  outlinedDisabledButton: {
    alignItems: 'center',
    borderColor: Color.Grey,
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 12,
  },
  text: {
    textAlign: 'center',
  },
});
