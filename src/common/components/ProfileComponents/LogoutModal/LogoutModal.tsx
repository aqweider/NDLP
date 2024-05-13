import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { Button, Text, View } from '@/src/common/components';
import { Color } from '@/src/theme/const';

interface Props {
  handleLogoutUser: () => void;
  cancelLogout: () => void;
}
export const LogoutModal: FC<Props> = ({ handleLogoutUser, cancelLogout }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text size={28} mt={24} mb={24} bold color={Color.Black}>
        {t('sure')}
      </Text>
      <View style={styles.controlsContainer}>
        <Button
          title={t('yesSure')}
          style={[styles.button, styles.buttonBg]}
          textColor={Color.Black}
          onPress={handleLogoutUser}
        />
        <Button
          title={t('cancel')}
          style={styles.button}
          onPress={cancelLogout}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: '46%',
  },
  buttonBg: {
    backgroundColor: Color.whiteGrey,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
