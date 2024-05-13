/* eslint-disable sonarjs/no-nested-template-literals */
import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Linking, Pressable, ScrollView, StyleSheet} from 'react-native';
import {ScrollView as Scrollable} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';

import {Images} from '@/src/app/assets/images';
import {
  Container,
  GradientView,
  Header,
  InvestorJourneyModal,
  Loader,
  Sheet,
  Text,
  View,
} from '@/src/common/components';
import ContentCard from '@/src/common/components/Cards/InsightInfoCard/ContentCard';
import {Color} from '@/src/theme/const';
import {UseGetSegmentsDataApi} from '@/src/app/store/useSegments';

export const SectorField = ({navigation, route}: any) => {
  const Segment = {...route.params};
  const {segment, segmentDataError, segmentDataLoading} = UseGetSegmentsDataApi(
    Segment.id,
  );
  console.log(Segment);
  // const field = route.params?.item || route.params;
  const investorType = route.params?.investorType;

  // const {selectedFieldData} = SectorsFieldsContent(field.parentId, field.id);
  // const {journeyData} = InvestorJourneyContent(field.parentId, field.id);

  const [isInternationalTabActive, setIsInternationalTabActive] = useState(
    investorType?.id !== 0,
  );
  const [sheetVisible, setSheetVisible] = useState(false);
  const [webSheetVisible, setWebSheetVisible] = useState(false);
  const [url, setUrl] = useState('');

  const snapPoints = useMemo(() => ['25%', '90%'], []);
  const [selectedJourney, setselectedJourney] = useState();
  const webViewSnapPoints = useMemo(() => ['60%', '90%'], []);

  const {t, i18n} = useTranslation();

  const renderValueProposition = () => {
    return segment[0]?.value_proposition.map(
      (item: valuePropositionProps, index: number) => {
        return (
          <View style={styles.valuePropositionItem} key={item.id}>
            <View style={{flexDirection: 'row'}}>
              <Text color={Color.White} size={14}>
                {index + 1}
              </Text>
              <View style={styles.bullet} />
            </View>
            <Text>{' '}</Text>
            <Text
              size={13}
              color={Color.White}
              style={styles.ValuePropositionText}>
              {item.description}
            </Text>
          </View>
        );
      },
    );
  };
  const renderSpecificEnablement = () => {
    return segment[0]?.segment_enablers.map((item: specificEnablementProps) => {
      return (
        <View key={item.id} style={styles.contentContainer}>
          <ContentCard title={item.title} summary={item.description} />
        </View>
      );
    });
  };
  const handleJourneyStepPressed = (item: InvestorsJourney) => {
    setSheetVisible(true);
    setselectedJourney(item);
    // test purpose
  };

  useEffect(() => {
    if (!webSheetVisible) {
      setUrl('');
    }
  }, [webSheetVisible]);

  const RenderInvestorsJourney = (data: InvestorJourneyProps) => {
    const investorData = data;
    return investorData.map((item: InvestorsJourney, index) => {
      return (
        <Pressable
          style={[
            styles.internationalJourneyContainer,
            index % 2 !== 0 && styles.rightContainer,
          ]}
          key={item.id}
          onPress={() => handleJourneyStepPressed(item)}>
          {index % 2 !== 0 && index !== investorData.length - 1 && (
            <View style={styles.imageCenter}>
              <Image
                source={Images.arrowDownLeft}
                style={[
                  styles.rightArrow,
                  i18n.language !== 'ar' && {transform: [{scaleX: -1}]},
                ]}
                resizeMode="contain"
              />
            </View>
          )}
          <View
            style={[
              styles.internationalJourneyInnerContainer,
              item.condition !== t('optional') && {
                backgroundColor: Color.oldLavender,
              },
            ]}>
            <GradientView style={styles.numberContainer}>
              <Text color={Color.White} size={15}>
                {index + 1}
              </Text>
            </GradientView>
            <Text
              size={15}
              color={Color.White}
              numberOfLines={3}
              light
              style={styles.alignTextCenter}>
              {item.name}
            </Text>
            {!!item.condition && (
              <Text style={styles.alignTextCenter} size={15} color={Color.White} light>
                ({item.condition})
              </Text>
            )}
          </View>
          {index % 2 === 0 && index !== investorData.length - 1 && (
            <View style={styles.imageCenter}>
              <Image
                source={Images.arrowDownLeft}
                style={[
                  styles.leftArrow,
                  i18n.language === 'ar' && {transform: [{scaleX: -1}]},
                ]}
                resizeMode="contain"
              />
            </View>
          )}
        </Pressable>
      );
    });
  };
  const handleOpenWenView = (websiteUrl: string) => {
    Linking.openURL(websiteUrl).catch(() => Linking.openURL(websiteUrl));
  };

  return (
    <Container>
      {segment && segment.length > 0 && (
        <ScrollView>
          {segment && (
            <Header
              goBack
              onBackPress={() => navigation.goBack()}
              bgImageSrc={segment[0].img}
              title={Segment.name}
              customTitleStyle={styles.title}
            />
          )}
          <View style={styles.contentContainer}>
            <Text size={15} color={Color.White} bold mt={32} mb={8}>
              {t('ValueProposition')}
            </Text>
            {renderValueProposition()}
            <Text size={16} color={Color.White} bold mt={15} mb={8}>
              {t('segmentEnablers')}
            </Text>
          </View>

          {renderSpecificEnablement()}
          <View style={styles.journyContainer}>
            <View style={styles.tabContainer}>
              <Pressable style={styles.tabButton}>
                <GradientView
                  style={[
                    styles.tab,
                    isInternationalTabActive && styles.activeTab,
                  ]}
                  {...(!isInternationalTabActive && {
                    colors: [Color.Jacarta, Color.Jacarta],
                  })}>
                  <Text bold size={12} color={Color.White}>
                    {t('InternationalJourny')}
                  </Text>
                </GradientView>
              </Pressable>
            </View>
            {RenderInvestorsJourney(segment[0]?.journey)}
          </View>
        </ScrollView>
      )}
      <Sheet
        snapPoints={snapPoints}
        onClose={() => {
          setSheetVisible(false);
          setselectedJourney();
        }}
        isVisible={sheetVisible}
        backgroundColor={Color.Jacarta}>
        <InvestorJourneyModal
          onPress={websiteUrl => handleOpenWenView(websiteUrl)}
          selectedJouney={selectedJourney}
        />
      </Sheet>

      <Sheet
        snapPoints={webViewSnapPoints}
        isVisible={webSheetVisible}
        onClose={() => setWebSheetVisible(false)}
        backgroundColor={Color.Jacarta}>
        {url !== '' && (
          <Scrollable
            contentContainerStyle={{flexGrow: 1}}
            nestedScrollEnabled={true}>
            <WebView
              source={{uri: url}}
              style={styles.webView}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              scalesPageToFit={true}
              bounces={false}
              javaScriptEnabled
              thirdPartyCookiesEnabled
              startInLoadingState={true}
              onError={err => {
                console.log('err', err);
              }}
              renderLoading={() => {
                return <Loader />;
              }}
            />
          </Scrollable>
        )}
      </Sheet>
    </Container>
  );
};
const styles = StyleSheet.create({
  ValuePropositionText: {
    flex: 1,
    paddingLeft: 5,
  },
  activeTab: {
    borderRadius: 12,
  },
  alignTextCenter: {textAlign: 'center'},
  bullet: {
    backgroundColor: Color.White,
    borderRadius: 2,
    height: 2,
    marginTop: 10,
    width: 2,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  imageCenter: {justifyContent: 'center'},
  internationalJourneyContainer: {
    flexDirection: 'row',
    height: 145,
    width: '100%',
  },
  internationalJourneyInnerContainer: {
    alignItems: 'center',
    backgroundColor: Color.Jacarta,
    borderRadius: 360,
    elevation: 4,
    flex: 0,
    justifyContent: 'center',
    padding: 16,
    shadowColor: Color.Black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.04,
    shadowRadius: 10,
    width: 205,
  },
  journyContainer: {
    marginTop: 19,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  leftArrow: {height: 85, marginLeft: -17, marginTop: 60},
  numberContainer: {
    alignItems: 'center',
    backgroundColor: Color.Primary,
    borderRadius: 24,
    height: 24,
    justifyContent: 'center',
    marginBottom: 10,
    width: 24,
  },

  rightArrow: {height: 85, marginBottom: -60, marginRight: -17},
  rightContainer: {
    justifyContent: 'flex-end',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabButton: {flex: 1},
  tabContainer: {
    alignSelf: 'center',
    backgroundColor: Color.Jacarta,
    borderRadius: 16,
    flexDirection: 'row',
    marginBottom: 36,
    marginTop: 28,
    padding: 4,
    width: '75%',
  },
  title: {
    fontFamily: 'TheSansArabic-Plain',
  },
  valuePropositionItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingLeft: 10,
  },
  webView: {
    height: '100%',
    width: '100%',
  },
});
