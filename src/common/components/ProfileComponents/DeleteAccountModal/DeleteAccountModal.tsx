import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { Button, Text, View } from '@/src/common/components';
import { Color } from '@/src/theme/const';

interface Props {
  handleDeleteAccount: () => void;
  cancelDelete: () => void;
}
export const DeleteAccountModal: FC<Props> = ({
  handleDeleteAccount,
  cancelDelete,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text size={28} mt={24} mb={24} bold color={Color.Black}>
        {t('deleteAccountConfirmationMessage')}
      </Text>
      <View style={styles.controlsContainer}>
        <Button
          title={t('delete')}
          style={[styles.button, styles.buttonBg]}
          textColor={Color.Black}
          onPress={handleDeleteAccount}
        />
        <Button
          title={t('cancel')}
          style={styles.button}
          onPress={cancelDelete}
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
