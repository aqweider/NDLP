/* eslint-disable sonarjs/no-duplicate-string */
import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  FlatList,
  I18nManager,
  ImageBackground,
  Linking,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import WebView from 'react-native-webview';
import { useNetInfo, NetInfoState } from "@react-native-community/netinfo";

import ArrowCircle from '@/src/app/assets/icons/arrowCircle.svg';
import Bullet from '@/src/app/assets/icons/bullet.svg';
import {Images} from '@/src/app/assets/images';
import {storage} from '@/src/storage';
const lang = storage.getString('language');
import {
  Banner,
  CommitmentsSection,
  CommitteeSection,
  Container,
  GradientView,
  Header,
  Loader,
  NidlpObjectiveSection,
  PartnerModal,
  ProgramAspirations,
  ReportsSection,
  Sheet,
  Text,
  View,
  Image,
} from '@/src/common/components';
import {EnablersCard} from '@/src/common/components/Cards';
import {PartnersContent} from '@/src/common/content';
import {Color} from '@/src/theme/const';
import {UseGetAboutDataApi} from '@/src/app/store/useAbout';

export const About = ({navigation}: any) => {
  const {t, i18n} = useTranslation();
  const {aboutData, aboutLoading, aboutError} = UseGetAboutDataApi();
  const prominentInitiativesData = aboutData && aboutData?.initiatives;
  const VisionRealizationData = aboutData?.nidlps_vision_programs?.content;
    // i18n.language === 'ar'
    //   ?  aboutData?.nidlps_vision_programs?.content
    //   .map(item => ({
    //     ...item,
    //     id: 10 - item.id,
    //   }))
    //   .reverse()
    //   :
    //   aboutData?.nidlps_vision_programs?.content
  

  const partnersData = PartnersContent();    // aboutData ? aboutData?.partners : {};
  // const partnerDataList = aboutData ? aboutData?.partners?.partners : [];
  const committeeData = aboutData ? aboutData?.committee : [];
  const reportsData = aboutData ? aboutData?.nidlps_reports?.content : [];

  const [selectedPartner, setSelectedPartner] = useState<Partner>();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [webSheetVisible, setWebSheetVisible] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState<string>();
  const [prominentInitiativesModal, setProminentInitiativesModal] =
    useState(false);
  const [selectedProminentInitiatives, setSelectedProminentInitiatives] =
    useState<ProminentInitiativesProps>();
  const [showVisionProgram, setShowVisionProgram] = useState(false);
  const [selectedVisionProgram, setSelectedVisionProgram] =
    useState<VisionProgramProps>();
  // const [pagintationIndex, setPaginationIndex] = useState(
  //   i18n.language === 'ar' ? aboutData?.nidlps_vision_programs?.content.length - 1 : 0 ,
  // );
  const [pagintationIndex, setPaginationIndex] = useState(i18n.language === 'ar' ? aboutData?.nidlps_vision_programs?.content.length - 1 : 0);

  const snapPoints = useMemo(() => ['35%', '90%'], []);
  const snapPointsProminent = useMemo(() => ['35%', '80%'], []);
  const snapPointsProgramVision = useMemo(() => ['35%', '45%'], []);
  const webViewSnapPoints = useMemo(() => ['60%', '90%'], []);

  const baseOptions = {
    vertical: false,
    width: Dimensions.get('screen').width,
  } as const;

  useEffect(() => {
    if (!pagintationIndex) {
      setPaginationIndex(i18n.language === 'ar' ? aboutData?.nidlps_vision_programs?.content.length - 1 : 0);
    }
  }, [aboutData]);

  const renderProminentInitiatives = () => {
    return (
      prominentInitiativesData &&
      prominentInitiativesData?.initiatives.map(
        (item: ProminentInitiativesProps) => {
          return (
            <Pressable
              key={item.id}
              style={styles.card}
              onPress={() => {
                setSelectedProminentInitiatives(item);
                setProminentInitiativesModal(true);
              }}>
              <ImageBackground
                source={{uri: item.imageSrc}}
                style={styles.prominentInitiativeImg}>
                <Text size={18} color={Color.White} bold style={{width: '70%'}}>
                  {item.title}
                </Text>
                <ArrowCircle
                  width={27.44}
                  height={27.84}
                  style={i18n.language === 'ar' && {transform: [{scaleX: -1}]}}
                />
              </ImageBackground>
            </Pressable>
          );
        },
      )
    );
  };

  const handlePartnerPress = (item: Partner) => {
    setSelectedPartner(item);
    setWebViewUrl(item?.websiteUrl);
    setSheetVisible(true);
  };

  const RenderPartnerItem = ({item}: {item: Partner}) => {
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

  const VisionRealizationCard = useCallback(({item}) => {
    return (
      <EnablersCard
        key={item.id.toString()}
        item={item}
        cardStyle={{width: 165}}
        carouselButton={true}
        onPress={() => {
          setShowVisionProgram(true);
          setSelectedVisionProgram(item);
        }}
      />
    );
  }, []);

  const renderPagination: ListRenderItem<VisionProgramProps> = useCallback(
    ({item, index}) => {
      return (
        <View
          style={
            pagintationIndex === index
              ? styles.activePagination
              : styles.pagination
          }
        />
      );
    },
    [pagintationIndex],
  );
  const PrivacyPage = {
    en: 'https://daleel.gov.sa/%d8%b3%d9%8a%d8%a7%d8%b3%d8%a9-%d8%a7%d9%84%d8%ae%d8%b5%d9%88%d8%b5%d9%8a%d8%a9/?lang=en',
    ar: 'https://daleel.gov.sa/%d8%b3%d9%8a%d8%a7%d8%b3%d8%a9-%d8%a7%d9%84%d8%ae%d8%b5%d9%88%d8%b5%d9%8a%d8%a9/?lang=ar',
  };

  return (
    <Container>
      <ScrollView
        style={styles.scrollable}
        showsVerticalScrollIndicator={false}>
        <Header hideBackground customHeaderStyle={styles.header} register />
        <ImageBackground source={Images.aboutHeader} style={styles.headerImg}>
          <GradientView
            style={styles.aboutDaleelDesc}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[Color.chineseBlack, Color.imperial]}>
            <Text bold size={16} mb={6} color={Color.White}>
              {aboutData?.title}
            </Text>
            <Text size={12} color={Color.White} style={{textAlign: 'center'}}>
              {aboutData?.discription}
            </Text>
          </GradientView>
        </ImageBackground>
        <View style={styles.innerContainer}>
          <View style={styles.contentContainer}>
            <Text size={24} color={Color.White} bold mb={24} mt={32}>
              {aboutData?.about_NIDLP?.title}
            </Text>
            <Banner data={aboutData?.about_NIDLP} />
          </View>
          <View>
            <Text mb={27} size={24} color={Color.White} bold ml={24}>
              {aboutData?.nidlps_vision_programs?.title}
            </Text>

            <Carousel
              defaultIndex={i18n.language === 'ar' ? aboutData?.nidlps_vision_programs?.content.length - 1 : 0 }
              style={styles.caurosel}
              width={170}
              height={260}
              pagingEnabled
              loop
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
              mode="horizontal-stack"
              data={VisionRealizationData}
              // data={aboutData?.vision_programs}
              modeConfig={{
                snapDirection: i18n.language === 'ar' ? 'right' : 'left' ,
                stackInterval: 75,
                scaleInterval: 0.16,
                opacityInterval: 0,
              }}
              onProgressChange={(offsetProgress, absoluteProgress) => {
                console.log('absoluteProgress', pagintationIndex, absoluteProgress);
                // Math.ceil(absoluteProgress) % 11 !== pagintationIndex &&
                // setPaginationIndex(Math.ceil(absoluteProgress) % 11);
                if (absoluteProgress >= pagintationIndex + 0.5) {
                  Math.ceil(absoluteProgress) % 11 !== pagintationIndex &&
                    setPaginationIndex(Math.ceil(absoluteProgress) % 11);
                } else if (absoluteProgress < pagintationIndex - 0.5) {
                  Math.floor(absoluteProgress) % 11 !== pagintationIndex &&
                    setPaginationIndex(Math.floor(absoluteProgress) % 11); 
                }
              }}
              renderItem={VisionRealizationCard}
            />

            <View style={styles.paginationContainer}>
              <FlatList
                data={VisionRealizationData}
                renderItem={renderPagination}
                keyExtractor={sector => sector.id.toString()}
                horizontal
                inverted={i18n.language === 'ar'}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <NidlpObjectiveSection
            objectives={aboutData?.objectives}
            programIntegration={aboutData?.program_integration}
          />
        </View>

        <View style={styles.contentContainer}>
          <ProgramAspirations data={aboutData?.program_aspirations} />
          <View>
            <Text
              color={Color.White}
              size={28}
              bold
              mb={41}
              mt={41}
              style={{width: '100%'}}>
              {aboutData?.nidlps_commitments?.title}
            </Text>
            <CommitmentsSection commitmentsData={aboutData?.nidlps_commitments?.content} />
          </View>
          <Text size={28} color={Color.White} bold mb={8} mt={8}>
            {prominentInitiativesData?.title}
          </Text>
          <Text size={13} color={Color.TaupeGray} mb={12}>
            {prominentInitiativesData?.description}
          </Text>
          {renderProminentInitiatives()}
          <Text size={28} color={Color.White} bold mt={32}>
          {t('successPartner')}
          </Text>
          <Text size={13} color={Color.White} mt={8} mb={8}>
          {t('successPatDesc')}
          </Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            numColumns={10}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={partnersData.slice(0, 40)}
            renderItem={RenderPartnerItem}
            keyExtractor={partner => partner.id.toString()}
            scrollEnabled={false}
          />
          <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            {partnersData
                .slice(40, 45)
                .map((item: Partner) => RenderPartnerItem({item}))}
          </View>
        </ScrollView>

        <View style={styles.contentContainer}>
          <Text size={28} color={Color.White} bold mb={16} mt={24}>
            {aboutData?.committee?.title}
          </Text>
          <CommitteeSection committeeData={committeeData} ceoTitle={aboutData?.committee?.ceo_title} />
        </View>

        <View style={styles.contentContainer}>
          <Text size={28} color={Color.White} bold mb={32} mt={32}>
            {aboutData?.nidlps_reports?.title}
          </Text>
          <ReportsSection reportsData={reportsData} />
        </View>
        <View
          style={{
            width: '100%',

            alignItems: 'center',
            marginBottom: 40,
          }}>
          <Pressable
            onPress={() =>
              Linking.canOpenURL(`${aboutData?.privacy_policy_url}?lang=${lang}`).then(() => {
                 Linking.openURL(
                  aboutData && `${aboutData?.privacy_policy_url}?lang=${lang}`,
                )
              })
            }>
            <Text style={{color: 'white'}}>{t('buttons.privacyPolicy')}</Text>
          </Pressable>
        </View>
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
        isVisible={prominentInitiativesModal || showVisionProgram}
        navigation={navigation}
        onClose={() =>
          showVisionProgram
            ? setShowVisionProgram(false)
            : setProminentInitiativesModal(false)
        }
        snapPoints={
          showVisionProgram ? snapPointsProgramVision : snapPointsProminent
        }>
        {prominentInitiativesModal ? (
          <ScrollView>
            <Text
              bold
              size={28}
              color={Color.White}
              mt={10}
              mb={24}
              style={{alignSelf: 'center'}}>
              {selectedProminentInitiatives?.title}
            </Text>
            {selectedProminentInitiatives?.points.map(item => {
              return (
                <View key={item.id} style={styles.bulletContainer}>
                  <Bullet
                    width={10}
                    height={15}
                    style={{
                      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                    }}
                  />
                  <Text
                    size={15}
                    color={Color.White}
                    style={styles.prominentInitiativeBullet}>
                    {item.description}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.programVisionDescContainer}>
            <Text
              mt={10}
              bold
              color={Color.White}
              size={28}
              style={{textAlign: 'center', width: '80%'}}>
              {selectedVisionProgram?.name}
            </Text>
            <Text light size={16} color={Color.White} mt={8}>
              {selectedVisionProgram?.desc}
            </Text>
          </View>
        )}
      </Sheet>

      <Sheet
        snapPoints={webViewSnapPoints}
        isVisible={webSheetVisible}
        onClose={() => setWebSheetVisible(false)}>
        {webViewUrl && webSheetVisible && (
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 80}}>
            <WebView
              source={{uri: webViewUrl}}
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
  aboutDaleelDesc: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 27,
    width: '82%',
  },
  activePagination: {
    backgroundColor: Color.MediumPurple,
    borderRadius: 16,
    height: 5,
    marginRight: 5,
    width: 19,
  },
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    marginHorizontal: 24,
  },
  card: {
    borderColor: Color.Jacarta,
  },
  caurosel: {
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: -10,
    width: '80%',
  },

  contentContainer: {
    backgroundColor: Color.DarkGunMetal,
    paddingHorizontal: '6%',
  },
  contentContainerStyle: {
    paddingLeft: 24,
  },

  header: {
    backgroundColor: Color.Transparent,
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  headerImg: {
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.45,
    justifyContent: 'flex-end',
    paddingBottom: '7%',
    width: '100%',
  },
  innerContainer: {
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
    // height: 80,
    // width: 80,
    // borderRadius: 40,
  },
  partnerImage: {
    height: 85,
    width: 85,
    // borderRadius: 40,
    // margin: 10,
    // backgroundColor: 'white',
  },
  programVisionDescContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  prominentInitiativeBullet: {
    fontFamily: I18nManager.isRTL ? 'TheSansArabic-Plain' : 'OpenSans-Light',
    lineHeight: 21,
    marginStart: 15,
  },
  prominentInitiativeImg: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  scrollable: {flex: 1, marginBottom: 100},
  webView: {
    height: '100%',
    width: '100%',
  },
});
