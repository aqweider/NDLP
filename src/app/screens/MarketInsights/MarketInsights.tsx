import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useNetInfo, NetInfoState } from "@react-native-community/netinfo";

import {
  Container,
  GradientButton,
  Header,
  Text,
  View,
} from '@/src/common/components';
import { EnablersCard as SectorFieldCard } from '@/src/common/components/Cards';
import { Route } from '@/src/navigation/routes';
import { Color, TextSize } from '@/src/theme/const';
import { UseGetMarketInsightsSectorsApi } from '@/src/app/store/useMarketInsights';

export const MarketInsight = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const internetState: NetInfoState = useNetInfo();
  // const isLTR = i18n.language === 'en';

  const { 
    sectorLoading, 
    sectors, 
    defaultId, 
    selectedData,
    insightsData,
    insightsLoading,
    filterData
   } = UseGetMarketInsightsSectorsApi();
  
  const defaultIndex = defaultId;
  const [selectedId, setSelectedId] = useState(defaultIndex);
  const [selectedParentName, setSelectedParentName] = useState(
    insightsData?.[0]?.name,
  ); 

  const baseOptions = {
    vertical: false,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  } as const;
  
 
  useEffect(() => {
    if (!selectedId) {
      setSelectedId(defaultId)
    }
  }, [defaultId]);

  const renderSectorFieldItem: ListRenderItem<MarketInsightProps> = ({
    item,
  }) => {
    return (
      <SectorFieldCard
        item={item}
        onPress={() =>
          navigation.navigate(Route.MARKET_INSIGHTS_FIELD, {
            ...item,
            parentName: selectedParentName,
          })
        }
      />
    );
  };

  const renderSectorButton = useCallback(
    ({
      item,
    }: {
      item: { name: string; id: string };
    }) => {
      // Complex item rendering logic based on item data
      return (
        <GradientButton
          label={item?.name}
          active={item?.id === selectedId}
          onPress={async (index: string | undefined) => {
            setSelectedId(item?.id);
            setSelectedParentName(item?.name);
            // handleClick({sectorId: item?.id})
            await filterData(insightsData,item?.id);
          }}
          id={item?.id}
          customStyle={{ minHeight: 40, minWidth: baseOptions.width * 0.25 }}
        />
        );
    },
    [sectors, defaultId, selectedId, insightsData]
  );

  const ItemSeperator = useCallback(() => {
    return <View style={{ width: 12 }} />;
  }, []);

  const listHeader = useCallback(() => {
    return (
      <Text size={28} color={Color.White} bold mb={16} ml={24} mt={30}>
        {t('Discover')}
      </Text>
    );
  }, [t]);

  return (
    <Container>
      <View>
        <Header
          title={t('marketInsightTitle')}
          isGradient={true}
          hideBackground
          customHeight={baseOptions.height * 0.14}
          customContainerTitleStyle={styles.headerTitleContainer}
          customTitleStyle={styles.headerTitle}
          register
        />
        {/* internetState.isConnected === false */}
        {sectors && sectors.length > 0 && 
        <FlatList
          // data={isLTR ? sectors : sectors && sectors.reverse()}
          data={sectors}
          renderItem={renderSectorButton}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.sectorButtonListContainer,
            { justifyContent: 'center' },
          ]}
          ItemSeparatorComponent={ItemSeperator}
          // inverted={!isLTR}
        />
        }
      </View>
          {insightsLoading || sectorLoading ? 
          <ActivityIndicator size="large" color={Color.Primary} />
          :
          selectedData ?
          <FlatList
            data={selectedData}
            renderItem={renderSectorFieldItem}
            ListHeaderComponent={listHeader}
            keyExtractor={sector => sector.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.sectorsfieldContainer}
            style={{ flex: 1, marginBottom: 110 }}
            contentContainerStyle={{ flexGrow: 1 }}
          />
          : 
          null
          }
      
    </Container>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'TheSansArabic-Plain',
    fontSize: TextSize.Title3,
    textAlign: 'center',
  },
  headerTitleContainer: {
    alignSelf: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    width: '50%',
  },

  sectorButtonListContainer: {
    flexGrow: 1,
    marginBottom: 14,
    paddingHorizontal: 24,
    paddingTop: 22,
  },
  sectorsfieldContainer: {
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 24,
    width: '100%',
  },
});
