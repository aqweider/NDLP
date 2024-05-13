import React, { useMemo,useEffect,  useState } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, Platform, Pressable, StyleSheet, BackHandler, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import {
  Button,
  ButtonsList,
  Container,
  GradientButton,
  GradientView,
  Header,
  Loader,
  Sheet,
  Text,
  View,
} from '@/src/common/components';
import { Color, FontFamily } from '@/src/theme/const';
import { UseGetEnablersDataApi } from '@/src/app/store/useEnablers';
import { useHideBar } from '@/src/app/hooks/useHideBar';

export const Enablers = ({ navigation, route }: any) => {
  // const enablersData = EnablersContent();
  const enablerType = route.params.type;
  const initialIndex = route.params.index;
  const {enablersDataError,
    enablersDataLoading,
    selectedEnabler,
    setSelectedEnabler,
    generalEnabler,
    specificEnabler} = UseGetEnablersDataApi(enablerType, initialIndex);
    const { setShowTab } = useHideBar();

  // const [selectedEnabler, setSelectedEnabler] = useState<EnablerProps | any>(
  //   enablersData[enablerType === 'general' ? 0 : 1].enablers[initialIndex],
  // );
  const [selectedField, setSelectedField] =
    useState<EnablerFieldProps | null>();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [webSheetVisible, setWebSheetVisible] = useState(false);
  const [webUrl, setWebUrl] = useState('');

  const snapPoints = useMemo(() => ['25%', '90%'], []);

  const webViewSnapPoints = useMemo(() => ['60%', '90%'], []);
  const { i18n } = useTranslation();

  useEffect(() => {
    const backAction = () => {
      if (sheetVisible) {
        setShowTab('flex');
        setSheetVisible(false);
        navigation.getParent().setOptions({
          tabBarStyle: {
            display: 'flex',
            borderTopLeftRadius: 21,
            borderTopRightRadius: 21,
            backgroundColor: Color.DarkPurple,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 94,
            zIndex: 8,
            borderTopWidth: 0,
            elevation: 4,
            shadowColor: Color.Black,
            shadowOffset: {
              width: 2,
              height: 1,
            },
            shadowOpacity: 0.13,
            shadowRadius: 2.62,
          },
        });
       
      }
      // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => null,
      //     style: 'cancel',
      //   },
      //   {text: 'YES', onPress: () => BackHandler.exitApp()},
      // ]);
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [sheetVisible]);

  const handleFieldPress = (item: EnablerFieldProps) => {
    setSelectedField(item);
    setSheetVisible(true);
  };

  const renderContentPoints = (points: Array<string>) => {
    return points.map((item: string) => {
      return (
        <View key={item} style={styles.pointRow}>
          <View style={styles.bullet} />

          <Text size={15} color={Color.White}>
            {item}
          </Text>
        </View>
      );
    });
  };
  const renderContentTitle = () => {
    return selectedField?.content?.map((item: EnablerContentProps) => {
      return (
        <View key={item.id} style={styles.fieldContent}>
          {!!item.name && (
            <Text size={20} color={Color.White} bold mb={16}>
              {item.name}
            </Text>
          )}
          {!!item.text && (
            <Text size={15} color={Color.White} mb={8}>
              {item.text}
            </Text>
          )}
          {item.list.length > 0 && renderContentPoints(item.list)}
          {!!item.textDone && (
            <Text size={15} color={Color.White} mt={16} mb={8}>
              {item.textDone}
            </Text>
          )}
          {!!item?.link?.[0]?.value && (
            <GradientButton
              label={item?.link?.[0]?.name}
              onPress={() => {
                setWebUrl(item?.link?.[0]?.value);
                setWebSheetVisible(true);
              }}
              customStyle={styles.btn}
              textStyle={styles.btnText}
            />
          )}
        </View>
      );
    });
  };
  const renderEnabler = () => {
    return selectedEnabler?.enablerItem.map((item: EnablerFieldProps) => {
      return (
        <Pressable
          style={styles.card}
          onPress={() => handleFieldPress(item)}
          key={item.id}>
          <GradientView style={styles.topSection}>
            <Text size={17} color={Color.White} light style={styles.fontStyle}>
              {item.name}
            </Text>
          </GradientView>
          <View style={styles.bottomSection}>
            <Text
              size={13}
              color={Color.White}
              light
              numberOfLines={2}
              style={[styles.fontStyle, { lineHeight: 18 }]}>
              {item?.content[0].text.replace(/(?:\r\n|\r|\n|\t)/g, '')}
            </Text>
          </View>
        </Pressable>
      );
    });
  };

  return (
    <Container>
      <ScrollView stickyHeaderIndices={[1]} style={{ marginBottom: 100 }}>
        <Header
          goBack
          onBackPress={() => navigation.goBack()}
          bgImageSrc={selectedEnabler?.imageSrc}
          title={selectedEnabler?.name}
          customHeight={200}
          customTitleStyle={styles.title}
        />
        <SafeAreaView style={styles.topListContainer}>
          <ButtonsList
            list={
              enablerType === 'general'
                ?  generalEnabler
                : specificEnabler
            }
            selectedId={initialIndex}
            setSelected={setSelectedEnabler}
          />
        </SafeAreaView>
        <View>{renderEnabler()}</View>
      </ScrollView>
      <Sheet
        isVisible={sheetVisible}
        snapPoints={snapPoints}
        navigation={navigation}
        onClose={() => {
          setSheetVisible(false);
        }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
          {selectedField && (
            <View style={styles.contentContainer}>
              <Text bold size={38} color={Color.White} mt={24} mb={16}>
                {selectedField.name}
              </Text>

              {selectedField.content && renderContentTitle()}
            </View>
          )}
        </ScrollView>
      </Sheet>

      <Sheet
        snapPoints={webViewSnapPoints}
        isVisible={webSheetVisible}
        onClose={() => setWebSheetVisible(false)}>
        {!!webUrl && webSheetVisible && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <WebView
              source={{
                uri: webUrl,
              }}
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
  bottomSection: {
    backgroundColor: Color.Jacarta,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
  },
  btn: {
    marginTop: 10,
    paddingVertical: 12,
  },
  btnText: {
    fontFamily: FontFamily.default,
    fontSize: 17,
  },
  bullet: {
    backgroundColor: Color.White,
    borderRadius: 4,
    height: 4,
    marginRight: 5,
    marginTop: 10,
    width: 4,
  },
  card: {
    backgroundColor: Color.White,
    borderRadius: 16,
    elevation: 4,
    marginBottom: 15,
    marginHorizontal: 24,
    shadowColor: Color.Black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  fieldContent: { marginBottom: 16 },
  fontStyle: {
    fontFamily: I18nManager.isRTL
      ? FontFamily.default
      : FontFamily.openSansLight,
  },
  pointRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  title: {
    fontFamily: I18nManager.isRTL
      ? FontFamily.default
      : FontFamily.openSansLight,
    fontSize: 24,
    marginTop: 100,
  },
  topListContainer: {
    alignItems: 'center',
    backgroundColor: Color.DarkGunMetal,
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'android' ? 25 : 0,
    // paddingTop: Platform.OS === 'ios' ? 30 : 0,
    zIndex: 10,
  },
  topSection: {
    alignItems: 'flex-start',
    backgroundColor: Color.DarkBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  webView: {
    height: '100%',
    width: '100%',
  },
});
