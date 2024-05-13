/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import 'react-native-get-random-values';

import React, {
  FC,
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, StyleSheet, ViewStyle } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import {
  Button,
  GradientButton,
  Icon,
  Text,
  View,
} from '@/src/common/components';
import { Route } from '@/src/navigation/routes';
import { Color } from '@/src/theme/const';

export type FilterProps = {
  enablersData: any;
  investorTypes: any;
  navigation: any;
  sectorsData: any;
};

export type selectedInvestorProps = {
  theSector: any;
  segment: any;
  investorType: any;
};

export type contentItemProps = {
  name: 'theSector' | 'segment' | 'investorType' | 'enablerType' | 'category';
  data: any;
  ref?: React.MutableRefObject<SelectDropdown | undefined>;
  additionalStyle?: ViewStyle;
  disabled?: boolean;
};

export type filterContentProps = contentItemProps[];

export type selectedEnablerProps = {
  enablerType: any;
  category: any;
};

export const Filter: FC<FilterProps> = ({
  enablersData,
  investorTypes,
  navigation,
  sectorsData
}: FilterProps) => { 
  const [selectedInvestor, setSelectedInvestor] =
    useState<selectedInvestorProps>({
      theSector: false,
      segment: false,
      investorType: false,
    });

  const [selectedEnabler, setSelectedEnabler] = useState<selectedEnablerProps>({
    enablerType: false,
    category: false,
  });

  const [investorFilter, setInvestorFilter] = useState(true);
  const [fillFields, setFillFields] = useState(false);
  const { t, i18n } = useTranslation();

  const sectorRef = useRef<SelectDropdown | undefined>();
  const segmentRef = useRef<SelectDropdown | undefined>();
  const investorTypeRef = useRef<SelectDropdown | undefined>();

  const categoryRef = useRef<SelectDropdown | undefined>();
  const enablerTypeRef = useRef<SelectDropdown | undefined>();

  const findSectorSegments = React.useMemo(() => {
    const segments = sectorsData?.find(
      s => s.name == selectedInvestor.theSector.name,
    );
    const updateSegments = [];
    segments?.segments?.map(s =>
      updateSegments.push({
        name: s.title,
        id: s.id,
      }),
    );
    return updateSegments;
  }, [selectedInvestor.theSector.name]);

  console.log('findSectorSegments', findSectorSegments);
  

  const investorFilterContent: filterContentProps = [
    {
      name: 'theSector',
      data: sectorsData,
      ref: sectorRef,
    },
    {
      name: 'segment',
      data: findSectorSegments.length > 0 ? findSectorSegments : [
        {
          name: t('fillSector'),
        },
      ],
      ref: segmentRef,
      additionalStyle: {flexGrow: 1.2},
      disabled: !selectedInvestor?.theSector,
    },
  ];

 

  const enablerFilterContent: filterContentProps = [
    {
      name: 'enablerType',
      data: [
        { id: 0, name: t('generalEnablers'), type: 'general' },
        { id: 1, name: t('specificEnablers'), type: 'spec' },
      ],

      ref: enablerTypeRef,
    },
    {
      name: 'category',
      data: !selectedEnabler?.enablerType
        ? [
            {
              name: t('fillEnabler'),
            },
          ]
        : selectedEnabler?.enablerType?.id === 0
        ? enablersData[0].enablers
        : enablersData[1].enablers,
      ref: categoryRef,
      disabled: !selectedEnabler?.enablerType,
    },
  ];

  const upIcon = useCallback(() => {
    return (
      <Icon name="caretdown" type="AntDesign" size={9} color={Color.White} />
    );
  }, []);

  const downIcon = useCallback(() => {
    return (
      <Icon name="caretup" type="AntDesign" size={9} color={Color.White} />
    );
  }, []);

  const handleSelectInvestorFilter = (
    parentItem: {
      name: any;
      data?: any;
      ref?: React.MutableRefObject<SelectDropdown | undefined>;
    },
    selectedItem: { name: any },
    index: number,
  ) => {
    if (
      index === 0 &&
      selectedItem?.name !== selectedInvestor?.theSector?.name
    ) {
      investorFilterContent?.[1].ref?.current?.reset();
    }
    setSelectedInvestor(prev => ({
      ...prev,
      [parentItem.name]: selectedItem,
      ...(index === 0 &&
        selectedItem?.name !== selectedInvestor?.theSector?.name && {
          segment: false,
        }),
    }));
  };

  const handleSelectEnablerFilter = (
    parentItem: {
      name: string;
      data?: any;
      ref?: React.MutableRefObject<SelectDropdown | undefined>;
    },
    selectedItem: { name: string },
    index: number,
  ) => {
    if (
      index === 0 &&
      selectedItem?.name !== selectedEnabler?.enablerType?.name
    ) {
      enablerFilterContent[1].ref?.current?.reset();
    }
    setSelectedEnabler(prev => ({
      ...prev,
      [parentItem.name]: selectedItem,
      ...(index === 0 &&
        selectedItem?.name !== selectedEnabler?.enablerType?.name && {
          category: false,
        }),
    }));
  };
  const handleGuideMe = () => {
    if (
      investorFilter
        ? !(selectedInvestor.segment)
        : !(selectedEnabler.category && selectedEnabler.enablerType)
    ) {
      setFillFields(true);
      return;
    }
    investorFilter
      ? navigation.navigate(Route.SECTORS, selectedInvestor.segment)
      : navigation.navigate(Route.ENABLERS, {
          index: selectedEnabler?.category?.id % 4,
          type: selectedEnabler?.enablerType?.type,
        });
  };

  const resetState = () => {
    setSelectedInvestor({
      theSector: false,
      segment: false,
      investorType: false,
    });
    setSelectedEnabler({
      enablerType: false,
      category: false,
    });
    setFillFields(false);
  };

  useEffect(() => {
    investorFilter &&
      selectedInvestor.segment &&
      selectedInvestor.investorType &&
      setFillFields(false);

    !investorFilter &&
      selectedEnabler.category &&
      selectedEnabler.enablerType &&
      setFillFields(false);
  }, [
    investorFilter,
    selectedEnabler.category,
    selectedEnabler.enablerType,
    selectedInvestor.investorType,
    selectedInvestor.segment,
  ]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Button
          style={
            investorFilter
              ? [styles.activeTab]
              : [styles.inActiveTab, { marginStart: 15 }]
          }
          customTitleStyle={
            investorFilter ? styles.activeTextTab : styles.inActiveTextTab
          }
          title={t('investorJourney')}
          onPress={() => {
            resetState();
            setInvestorFilter(true);
          }}
        />
        <Button
          style={
            !investorFilter
              ? [styles.activeTab, { marginStart: 11 }]
              : [styles.inActiveTab, { marginStart: 15 }]
          }
          customTitleStyle={
            !investorFilter ? styles.activeTextTab : styles.inActiveTextTab
          }
          title={t('enablers')}
          onPress={() => {
            resetState();
            setInvestorFilter(false);
          }}
        />
      </View>
      <View style={styles.filterContainer}>
        {(investorFilter ? investorFilterContent : enablerFilterContent).map(
          (item: contentItemProps, index: number) => {
            return (
              <SelectDropdown
                key={item.name}
                data={item?.data}
                ref={item.ref as LegacyRef<SelectDropdown> | undefined}
                onSelect={selectedItem => {
                  investorFilter
                    ? handleSelectInvestorFilter(item, selectedItem, index)
                    : handleSelectEnablerFilter(item, selectedItem, index);
                }}
                {...(item?.disabled && {
                  disabledIndexs: [0],
                })}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem?.name;
                }}
                rowTextForSelection={(item, index) => {
                  return t(item.name);
                }}
                renderDropdownIcon={open => {
                  return open ? downIcon() : upIcon();
                }}
                buttonStyle={[styles.boxStyle, item?.additionalStyle]}
                buttonTextStyle={[
                  styles.selectedInput,
                  styles.interFont,
                  { fontSize: i18n.language === 'ar' ? 8 : 10 },
                ]}
                defaultButtonText={t(item.name)}
                dropdownStyle={styles.dropdownStyle}
                rowStyle={styles.rowStyle}
                rowTextStyle={[
                  styles.dropdownTextStyle,
                  styles.interFont,
                  item?.disabled && { color: Color.RustyRed },
                ]}
              />
            );
          },
        )}
      </View>
      <GradientButton
        label={t('guideMe')}
        onPress={handleGuideMe}
        textStyle={styles.interFont}
      />
      {fillFields && (
        <Text light size={14} mt={5} color={Color.RustyRed}>
          {t('fillFields')}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: Color.BlackCoral,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  activeTextTab: {
    fontFamily: 'TheSansArabic-Bold',
    fontSize: 14,
  },
  boxStyle: {
    alignItems: 'center',
    backgroundColor: Color.Jacarta2,
    borderRadius: 8,
    borderWidth: 0,
    flexGrow: 1,
    justifyContent: 'space-between',
    marginBottom: 12,
    margin: 0,
    marginHorizontal: 2,
    paddingVertical: 12,
    width: '30%',
  },
  container: {
    backgroundColor: Color.DarkPurple2,
    borderRadius: 16,
    marginBottom: 33,
    marginHorizontal: 20,
    marginTop: 30,
    paddingBottom: 34,
    paddingHorizontal: 10,
    paddingTop: 18,
  },
  dropdownStyle: {
    backgroundColor: Color.Jacarta2,
    borderRadius: 8,
    borderWidth: 0,
    left: '5%',
    marginBottom: 12,
    width: '88%',
  },
  dropdownTextStyle: {
    color: Color.White,
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },

  inActiveTab: {
    backgroundColor: Color.DarkPurple2,
    paddingVertical: 12,
  },
  inActiveTextTab: {
    fontFamily: 'TheSansArabic-Plain',
    fontSize: 14,
  },
  interFont: {
    fontFamily: 'TheSansArabic-Plain',
  },
  rowStyle: {
    borderBottomWidth: 0,
    flexGrow: 1,
    minHeight: 20,
  },
  selectedInput: {
    color: Color.White,
    fontSize: 12,
  },
});
