import 'react-native-get-random-values';

import React, { useCallback,  lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import { Container, Header, Text, View } from '@/src/common/components';
import { SourceDataCard } from '@/src/common/components/Cards';
// import { KeySourceData } from '@/src/common/content';
import { Color, TextSize } from '@/src/theme/const';
import { UseGetSourceOfDataApi } from '@/src/app/store/useMarketInsights';

export const MarketInsightField = ({ navigation, route }: any) => {
  const field = route.params;
  const { t } = useTranslation();
  const { KeySourceData,
    keySourceTitle,
    KeySourceDataError,
    KeySourceDataLoading } = UseGetSourceOfDataApi();  
  // const keySourceData = !KeySourceDataLoading && KeySourceData();

  const baseOptions = {
    vertical: false,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  } as const;

  const HeaderComponent = useCallback(() => {
    return (
      <>
        <Header
          backWithText
          title={field?.parentName}
          onBackPress={() => navigation.goBack()}
          isGradient={true}
          hideBackground
          customHeight={baseOptions.height * 0.14}
          customContainerTitleStyle={styles.headerTitleContainer}
          customTitleStyle={styles.headerTitle}
        />
        <Text light size={24} style={styles.fieldName} color={Color.White}>
          {field?.name}
        </Text>
      </>
    );
  }, [baseOptions.height, field?.name, field?.parentName, navigation]);

  // const renderInfoCard = useCallback(({ item }) => {
  //   return <InsightInfoCard info={item} />;
  // }, []);

  const InsightInfoCard = lazy(() => import('../../../common/components/Cards/InsightInfoCard/InsightInfoCard'))

  const fallbackUI = (
    <View>
      <ActivityIndicator size="small" color={Color.Primary} />
    </View>
  );

  const renderInfoCard = useCallback(({ item, index }) => {
    return (
      <View>
         <Suspense fallback={fallbackUI}>
         <InsightInfoCard info={item}/>
         </Suspense>
      </View>
      
      );
    // return 
  }, []);

  const FooterComponent = () => {
    return (
      <View style={styles.footer}>
        <Text bold size={16} color={Color.White} style={styles.footerTitle}>
          {keySourceTitle}
        </Text>
        {/* {KeySourceDataLoading && <ActivityIndicator size="large" color={Color.Primary} />} */}
        {/* {KeySourceData.map((item, index) => (
          <SourceDataCard key={index} {...item} />
        ))} */}
        {
          KeySourceData && KeySourceData.length > 0 &&  KeySourceData.map((item, index) => {
            return <SourceDataCard key={index} {...item} />;
          })
        }
      </View>
    );
  }

  // const FooterComponent = useCallback(() => {
  //   return (
  //     <View style={styles.footer}>
  //       <Text bold size={16} color={Color.White} style={styles.footerTitle}>
  //         {t('keySourcesForData')}
  //       </Text>
  //       {/* {KeySourceDataLoading && <ActivityIndicator size="large" color={Color.Primary} />} */}
  //       {/* {KeySourceData.map((item, index) => (
  //         <SourceDataCard key={index} {...item} />
  //       ))} */}
  //       {
  //         KeySourceData.map((item, index) => {
  //           console.log('itemitem', item);
            
  //           return <SourceDataCard key={index} {...item} />;
  //         })
  //       }
  //     </View>
  //   );
  // }, [t]);

  // const Seperator = useCallback(() => <View style={styles.seperator} />, []);
  const Seperator = () => (<View style={styles.seperator} />);
  return (
    <Container>
      <FlatList
        ListHeaderComponent={HeaderComponent}
        data={field.tabs}
        extraData={field.tabs}
        initialNumToRender={10}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={FooterComponent}
        renderItem={renderInfoCard}
        ItemSeparatorComponent={Seperator}
        contentContainerStyle={styles.listContainer}
        // key={uuidv4()}
        stickyHeaderIndices={[0]}
        // style={{height: 500}}
      />
    </Container>
  );
};
const styles = StyleSheet.create({
  fieldName: {
    backgroundColor: Color.DarkGunMetal,
    paddingBottom: 32,
    paddingHorizontal: 24,
    paddingTop: 25,
  },
  footer: { marginTop: 40, paddingHorizontal: 24 },
  footerTitle: {
    marginBottom: 22,
  },
  headerTitle: {
    fontFamily: 'TheSansArabic-Plain',
    fontSize: TextSize.Title3,
    textAlign: 'center',
    width: '80%',
  },
  headerTitleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    width: '80%',
  },
  listContainer: { paddingBottom: 16 },
  seperator: { height: 40 },
});
