import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Picker } from 'react-native-wheel-pick';

import { Text } from '@/src/common/components';
import { Color } from '@/src/theme/const';

import Country from './Country';
/**
 * Local imports
 */
import { countryPickerType } from './types';

const CountryPicker = (props: countryPickerType) => {
  const {
    pickerButtonColor,
    pickerButtonTextStyle,
    cancelText,
    confirmText,
    pickerBackgroundColor,
    pickerItemStyle,
    onPressCancel,
    onPressConfirm,
    showCountryPicker,
    setShowCountryPicker,
    selectedCountryValue,
    selectCountry,
  } = props;
  const { t } = useTranslation();
  const [chosenCountry, setChosenCountry] = useState(selectedCountryValue);
  const picker = useRef();

  const onCancelPress = () => {
    if (onPressCancel) {
      onPressCancel();
    }

    setShowCountryPicker(false);
  };

  const onPressSubmit = () => {
    if (onPressConfirm) {
      onPressConfirm();
    }

    selectCountry(chosenCountry as string);
    setShowCountryPicker(false);
  };

  return (
    <Modal visible={showCountryPicker} transparent={true}>
      <View style={styles.container}>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={onCancelPress}>
            <Text
              size={17}
              color={Color.White}
              style={[{ color: pickerButtonColor }, pickerButtonTextStyle]}>
              {cancelText || t('buttons.cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressSubmit}>
            <Text
              size={17}
              color={Color.White}
              style={[{ color: pickerButtonColor }, pickerButtonTextStyle]}>
              {confirmText || t('buttons.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
        <Picker
          ref={picker}
          selectedValue={selectedCountryValue}
          pickerData={Country.getAll().map((country: any, index: any) => ({
            key: country.iso2,
            value: country.iso2,
            label: country.name,
          }))}
          onValueChange={(country: string) => setChosenCountry(country)}
          style={{ flex: 1, backgroundColor: Color.Jacarta }}
          textColor={Color.White}
          textSize={16}
          selectTextColor={Color.White}
          isShowSelectLine={false} // Default is true
          selectLineColor={Color.Black}
          selectLineSize={6} // Default is 4
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    alignItems: 'center',
    backgroundColor: Color.Jacarta,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  container: {
    bottom: 10,
    position: 'absolute',
    width: '100%',
  },
});

export default CountryPicker;
