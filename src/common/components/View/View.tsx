import React from 'react';
import { useTranslation } from 'react-i18next';
import { ViewProps } from 'react-native';
import Theme from 'react-native-theming';

type Props = ViewProps;

export const View = ({ style, ...props }: Props) => {
  const { i18n } = useTranslation();

  const direction = i18n.dir();

  return <Theme.View style={[style, { direction }]} {...props} />;
};
