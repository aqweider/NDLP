import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const InvestorTypes = () => {
  const { t } = useTranslation();

  return useMemo(
    () => [
      {
        id: 0,
        name: t('localInvestor'),
      },
      {
        id: 1,
        name: t('internationalInvestor'),
      },
    ],
    [t],
  );
};
