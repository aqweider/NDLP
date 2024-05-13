import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {CarouselRenderItem} from 'react-native-reanimated-carousel/lib/typescript/types';

import {Container, Header, Text, View} from '@/src/common/components';
import {
  EnablersCard as SectorFieldCard,
  SectorsFullCard,
} from '@/src/common/components/Cards';
import {Route} from '@/src/navigation/routes';
import {Color} from '@/src/theme/const';

export const Sectors = ({navigation, route}: any) => {
  const {index, sectorsData, selectedSector} = {...route.params};
  const {t, i18n} = useTranslation();
  const isRTL = i18n.language === 'ar'
  const [sector, setSector] = useState(selectedSector);


  // const defaultIndex = isLTR
  //   ? route?.params?.index
  //   : 3 - (route?.params?.index || 0);
  const findSectorIndex = React.useMemo(
    () => sectorsData.findIndex(s => s.id == selectedSector.id),
    [selectedSector],
  );

  // const [selectedIndex, setSelectedIndex] = useState(findSectorIndex());

  // const selectedSector = sectorsData[selectedIndex];

  const baseOptions = {
    vertical: false,
    width: Dimensions.get('screen').width,
  } as const;

  const renderPagination: ListRenderItem<SectorProps> = ({item}) => {
    return (
      <View
        style={
          item.id === sector.id
            ? [styles.activePagination, {backgroundColor: Color.Mining}]
            : styles.pagination
        }
      />
    );
  };
  const renderSectorCard: CarouselRenderItem<SectorProps> = ({item, index}) => {
    return (
      <View style={styles.sectorsCardContainer}>
        <SectorsFullCard item={item} index={index} />
      </View>
    );
  };

  const renderSectorFieldItem: ListRenderItem<FieldProps> = ({item}) => {
    return (
      <SectorFieldCard
        item={{name: item.title, imageSrc: item.image}}
        onPress={() => navigation.navigate(Route.SECTORS, item)}
      />
    );
  };

  return (
    <Container>
      <ScrollView
        style={styles.scrollable}
        showsVerticalScrollIndicator={false}>
        <Header bgImageSrc={sector.image} customHeight={225} register />
        <View style={styles.sectorsCardParent}>
          <Carousel
            {...baseOptions}
            defaultIndex={findSectorIndex}
            style={styles.carousel}
            height={200}
            pagingEnabled={true}
            loop={false}
            data={sectorsData}
            onProgressChange={(offsetProgress, absoluteProgress) => {
              if (absoluteProgress <= 0.5) {
                setSector(sectorsData[0]);
              } else if (absoluteProgress > 0.5 && absoluteProgress <= 1.5) {
                setSector(sectorsData[1]);
              } else if (absoluteProgress > 1.5 && absoluteProgress <= 2.5) {
                setSector(sectorsData[2]);
              } else if (absoluteProgress > 2.5) {
                setSector(sectorsData[3]);
              }
            }}
            renderItem={renderSectorCard}
          />
        </View>
        <View style={styles.paginationContainer}>
          <FlatList
            data={isRTL ? [...sectorsData].reverse() :  sectorsData }
            renderItem={renderPagination}
            keyExtractor={sector => sector.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text size={13} color={Color.White} bold mt={32}>
            {i18n.language === 'ar'
              ? `${t('sector')} ${sector.name} ${t('inTheKingdom')}` : `${sector.name} ${t('sector')} ${t('inTheKingdom')}`
              }
          </Text>
          <Text size={15} color={Color.White} mt={8}>
            {sector.description}
          </Text>
        </View>
        <Text size={28} color={Color.White} bold mb={16} ml={24}>
          {t('Discover')}
        </Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.invisibleScrollView}
          scrollEnabled={false}>
          <FlatList
            data={sector?.segments}
            renderItem={renderSectorFieldItem}
            keyExtractor={sector => sector.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.sectorsfieldContainer}
            scrollEnabled={false}
          />
        </ScrollView>
      </ScrollView>
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
    width: '100%',
  },
  contentContainer: {
    // height: 320,
    paddingHorizontal: 24,
    marginBottom: 20
  },
  invisibleScrollView: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 20,
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
    marginTop: 24,
    width: '100%',
  },
  scrollable: {flex: 1, marginBottom: 90},
  sectorsCardContainer: {
    paddingHorizontal: 40,
  },
  sectorsCardParent: {
    marginTop: -110,
  },
  sectorsfieldContainer: {
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 24,
    width: '100%',
  },
});
