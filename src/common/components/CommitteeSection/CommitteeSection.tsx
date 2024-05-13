import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/src/common/components';
import { CommiteeCard } from '@/src/common/components/Cards';
import { Color } from '@/src/theme/const';

export const CommitteeSection = (props) => {
  const {committeeData, ceoTitle} = props;
  const CommitteeData = committeeData ? committeeData?.committee_members : [];
  const CEOData = committeeData && committeeData.nidlp_ceo;
  const { t } = useTranslation();
  return (
    <View>
      {CommitteeData && 
      <CommiteeCard item={CommitteeData[0]} customStyle={styles.firstCard} />
    }
      <View style={styles.container}>
        {CommitteeData && CommitteeData.slice(1, 7).map(item => {
          return <CommiteeCard key={item.id.toString()} item={item} />;
        })}
      </View>
      <View>
        <Text size={28} color={Color.White} bold mb={16} mt={24}>
          {ceoTitle}
        </Text>
        {CEOData && <CommiteeCard item={CEOData[0]} />}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  firstCard: {
    width: '100%',
  },
});
