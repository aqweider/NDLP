import 'react-native-get-random-values';

import React, {useMemo, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import { useNetInfo, NetInfoState } from "@react-native-community/netinfo";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {CarouselRenderItem} from 'react-native-reanimated-carousel/lib/typescript/types';
import WebView from 'react-native-webview';
import {v4 as uuidv4} from 'uuid';

import {Images} from '@/src/app/assets/images';
import {
  Container,
  Filter,
  Header,
  Loader,
  PartnerModal,
  Sheet,
  Text,
  View,
  Image,
} from '@/src/common/components';
import {
  EnablersCard,
  EventCard,
  HighLightCard,
  SectorsCard,
} from '@/src/common/components/Cards';
import {
  InvestorTypes,
} from '@/src/common/content';
import {Route} from '@/src/navigation/routes';
import {Color} from '@/src/theme/const';
import {UseGetHomeDataApi} from '@/src/app/store/useHome';
import {UseGetAllEnablersDataApi} from '@/src/app/store/useEnablers';
import {
  NotificationListner,
  requestUserPermission,
} from '@/src/app/utils/pushNotifications_helper';

export const Explore = ({navigation}: any) => {
  const {homeData, homeDataError, homeDataLoading} = UseGetHomeDataApi();
  const {allEnablersData} = UseGetAllEnablersDataApi();
  const enablersData = allEnablersData ? allEnablersData : [];
  const investorTypes = InvestorTypes();
  const sectorsData = homeData?.sectors?.content;

  const [selectedPartner, setSelectedPartner] = useState<Partner>();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [webSheetVisible, setWebSheetVisible] = useState(false);
  const internetState: NetInfoState = useNetInfo();

  const [sectorDescription, setSectorDescription] = useState<string>(
    // sectorsData[0].description,
    homeData?.sectors?.content[0].description,
  );
  const {t, i18n} = useTranslation();

  const [selectedSector, setSelectedSector] = useState(
    0,
    // i18n.language === 'en' ? 0 : 3,
  );
  const snapPoints = useMemo(() => ['60%', '90%'], []);
  const webViewSnapPoints = useMemo(() => ['60%', '90%'], []);

  useEffect(() => {
    NotificationListner(navigation);
  }, []);

  const renderSectorCard: CarouselRenderItem<SectorProps> = ({item}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate(Route.SECTORS_PARENT, {
            index: item.id,
            sectorsData,
            selectedSector: item,
          })
        }
        {...(Platform.OS === 'ios' && {
          hitSlop: {
            left: -100,
            right: -100,
            bottom: -100,
            top: -100,
          },
        })}
        style={styles.sectorsCardContainer}>
        <SectorsCard item={item} />
      </Pressable>
    );
  };
  const renderPagination: ListRenderItem<SectorProps> = ({item, index}) => {
    return (
      <View
        style={
          index === selectedSector
            ? [styles.activePagination, {backgroundColor: Color.Mining}]
            : styles.pagination
        }
      />
    );
  };
  const handlePartnerPress = (item: Partner) => {
    setSelectedPartner(item);
    setSheetVisible(true);
  };

  const renderPartnerItem: ListRenderItem<Partner> = ({item}) => {
    return (
      <Pressable
        style={styles.partnerContainer}
        onPress={() => handlePartnerPress(item)}>
        <Image
          source={item.imageSrc}
          style={styles.partnerImage}
          resizeMode="contain"
        />
      </Pressable>
    );
  };

  const handleEnablerPressed = (index: number, type: 'general' | 'spec') => {
    navigation.navigate(Route.ENABLERS, {index, type});
  };
  // if (homeData?.isError) {
  //   return (
  //     <Container>
  //       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <Text style={{color: 'white'}}>error</Text>
  //       </View>
  //     </Container>
  //   );
  // } 
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header showGif register />
        <View style={styles.contentContainer}>
          <Text size={16} color={Color.White} bold mt={23}>
            {t('whatsDaleel')}
          </Text>

          <Text
            size={14}
            color={Color.White}
            bold
            mt={8}
            style={{
              fontFamily:
                i18n.language === 'ar'
                  ? 'TheSansArabic-Plain'
                  : 'OpenSans-Light',
            }}>
            {t('whatsDaleelInfo')}

            {t('whatDaleelInfoRest')}
          </Text>
        </View>
        {
          homeData?.isError ? (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {/* <Text style={{color: 'white'}}>error</Text> */}
            </View>
            )
            :
        <View>
          <Filter
            enablersData={enablersData}
            investorTypes={investorTypes}
            navigation={navigation}
            sectorsData={sectorsData}
          />

          <View style={styles.sectorsContainer}>
            <Text size={28} color={Color.White} bold ml={24} mb={15}>
              {homeData?.sectors?.title}
            </Text>
            {homeData && (
              <Carousel
                defaultIndex={i18n.language === 'ar' ? sectorsData && sectorsData.length - 1 : 0}
                style={styles.carousel}
                width={200}
                height={280}
                pagingEnabled
                loop={false}
                panGestureHandlerProps={{
                  activeOffsetX: [-10, 10],
                }}
                mode="horizontal-stack"
                data={sectorsData}
                // data={i18n.language === 'en' ? sectorsData : sectorsData.reverse()}
                modeConfig={{
                  snapDirection: i18n.language === 'ar' ? 'right': 'left',
                  stackInterval: 75,
                  scaleInterval: 0.16,
                  opacityInterval: 0,
                }}
                onProgressChange={(offsetProgress, absoluteProgress) => {
                  if (absoluteProgress <= 0.5) {
                    setSectorDescription(sectorsData[0].description);
                    setSelectedSector(i18n.language === 'ar' ? 3 : 0);
                  } else if (absoluteProgress > 0.5 && absoluteProgress <= 1.5) {
                    setSectorDescription(sectorsData[1].description);
                    setSelectedSector(i18n.language === 'ar' ? 2:  1 );
                  } else if (absoluteProgress > 1.5 && absoluteProgress <= 2.5) {
                    setSectorDescription(sectorsData[2].description);
                    setSelectedSector(i18n.language === 'ar' ? 1 : 2);
                  } else if (absoluteProgress > 2.5) {
                    setSectorDescription(sectorsData[3].description);
                    setSelectedSector(i18n.language === 'ar' ? 0 : 3 );
                  }
                }}
                renderItem={renderSectorCard}
              />
            )}
            <View style={styles.paginationContainer}>
              <FlatList
                data={sectorsData}
                renderItem={renderPagination}
                keyExtractor={sector => sector.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.sectorDescriptionContainer}>
              <Text color={Color.White} size={13} mt={16} ml={24} mr={24}>
                {sectorDescription}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.contentContainer}>
              <Text size={24} color={Color.White} mt={32} mb={25}>
                {homeData &&
                homeData?.general_enablers?.title}
              </Text>
            </View>
            <View style={styles.enablersContainer}>
              {homeData &&
                homeData?.general_enablers?.enablers.map((item, index) => (
                  <EnablersCard
                    key={uuidv4()}
                    item={{...item, name: item.cardTitle}}
                    cardStyle={{marginBottom: 16}}
                    onPress={() => handleEnablerPressed(index, 'general')}
                  />
                ))}
            </View>
          </View>
          <View>
            <View style={styles.contentContainer}>
              <Text size={24} color={Color.White} mt={32} mb={25}>
                {homeData &&
                homeData?.specific_enablers?.title}
              </Text>
            </View>
            <View style={styles.enablersContainer}>
              {homeData &&
                homeData?.specific_enablers?.enablers.map((item, index) => (
                  <EnablersCard
                    key={uuidv4()}
                    item={{...item, name: item.cardTitle}}
                    cardStyle={{marginBottom: 16}}
                    onPress={() => handleEnablerPressed(index, 'spec')}
                  />
                ))}
            </View>
          </View>
          <View>
            <Text
              size={28}
              color={Color.White}
              mt={44}
              mb={22}
              style={styles.contentContainer}>
              {homeData &&
                homeData?.highlights?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {homeData &&
                homeData?.highlights?.content.map(item => {
                  return <HighLightCard key={item.id.toString()} item={item} />;
                })}
            </ScrollView>
          </View>

          <View style={{paddingBottom: 150}}>
            <Text
              size={28}
              color={Color.White}
              mt={57}
              mb={16}
              style={styles.contentContainer}>
              {homeData && homeData?.events?.title}
            </Text>
            <FlatList
              data={homeData && homeData?.events?.content}
              renderItem={EventCard}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.footerContainer}>
              <Image
                source={Images.footer}
                style={[
                  styles.footerImage,
                  i18n.language === 'ar' && {transform: [{scaleX: -1}]},
                ]}
                resizeMode="stretch"
              />
            </View>
          </View>
          </View>
        }
      </ScrollView>
      <Sheet
        isVisible={sheetVisible}
        navigation={navigation}
        onClose={() => setSheetVisible(false)}
        snapPoints={snapPoints}>
        {selectedPartner && (
          <PartnerModal
            onPress={() => setWebSheetVisible(true)}
            selectedPartner={selectedPartner}
          />
        )}
      </Sheet>

      <Sheet
        snapPoints={webViewSnapPoints}
        isVisible={webSheetVisible}
        onClose={() => setWebSheetVisible(false)}>
        {selectedPartner && webSheetVisible && (
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <WebView
              source={{uri: selectedPartner.websiteUrl}}
              style={styles.webView}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              scalesPageToFit={true}
              bounces={false}
              javaScriptEnabled
              thirdPartyCookiesEnabled
              startInLoadingState={true}
              renderLoading={() => {
                return <Loader />;
              }}
            />
          </ScrollView>
        )}
      </Sheet>
      
    </Container>
  );
};
const styles = StyleSheet.create({
  activePagination: {
    borderRadius: 16,
    height: 5,
    marginRight: 5,
    width: 19,
  },

  carousel: {
    alignItems: 'stretch',
    height: 320,
    marginLeft: -10,
    width: '100%',
  },

  contentContainer: {
    paddingHorizontal: 24,
  },
  enablersContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 24,
    width: '100%',
  },
  footerContainer: {
    bottom: '50%',
    height: 250,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    zIndex: -11,
  },
  footerImage: {
    width: '100%',
  },

  pagination: {
    backgroundColor: Color.lightGray,
    borderRadius: 2.5,
    height: 5,
    marginRight: 5,
    width: 5,
  },
  paginationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25,
    width: '100%',
  },
  partnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerImage: {height: 85, width: 85},
  sectorDescriptionContainer: {
    // height: 170,
    width: '100%',
  },
  sectorsCardContainer: {
    marginRight: 15,
  },
  sectorsContainer: {
    backgroundColor: Color.DarkGunMetal,
    paddingVertical: 16,
  },
  webView: {
    height: '100%',
    width: '100%',
  },
});
