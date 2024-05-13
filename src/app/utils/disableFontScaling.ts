import { Text } from 'react-native';

export const disableFontScaling = () => {
  const CustomText = Text as any;
  CustomText.defaultProps = CustomText.defaultProps || {};
  CustomText.defaultProps.allowFontScaling = false;
};
