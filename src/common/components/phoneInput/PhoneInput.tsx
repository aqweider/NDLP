import React, { useCallback, useEffect, useState } from 'react';
import {
  I18nManager,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Text } from '@/src/common/components';
import { Color } from '@/src/theme/const';

import CountryPicker from './CountryPicker';
import * as Countries from './data/countries.json';
import { PhoneInputProps, PhoneNumberType } from './types';

export const PhoneInput = (props: PhoneInputProps) => {
  const {
    value,
    label,
    textInputStyle,
    placeholder,
    placeholderTextColor,
    flagStyle,
    error,
  } = props;
  const { initialCountry = value?.iso2 || 'sa', onChangeText } = props;
  const [inputValue, setInputValue] = useState(value?.number || '');
  const [iso2, setIso2] = useState<string>(initialCountry); // handle Abbreviation of the country name
  const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false); // handle visibility of country model picker that we choose the country from it

  const getCountryCode = useCallback(() => {
    const countryData = Countries[iso2 as keyof typeof Countries];
    return countryData ? countryData.dialCode : null;
  }, [iso2]);

  const getDialCode = useCallback(() => {
    return Countries[iso2 as keyof typeof Countries].dialCode;
  }, [iso2]);

  const selectCountry = (iso2: string) => {
    setIso2(iso2);
  };
  const onPressFlag = useCallback(() => {
    if (iso2) {
      setShowCountryPicker(true);
    }
  }, [iso2]);
  const codeCountryPicker = useCallback(
    () => (
      <TouchableWithoutFeedback onPress={onPressFlag}>
        <View style={styles.dialCode}>
          <Text size={17} color={Color.White}>{`(+${getDialCode()})`}</Text>
          <Text
            size={24}
            color={Color.White}
            style={{ marginHorizontal: 8, paddingBottom: 5 }}>
            |
          </Text>
        </View>
      </TouchableWithoutFeedback>
    ),
    [getDialCode, onPressFlag],
  );

  const RenderTextInput = useCallback(() => {
    return (
      <View
        style={[
          styles.input,
          !!error && { borderColor: Color.Pigment, borderWidth: 1 },
        ]}>
        {codeCountryPicker()}
        <TextInput
          onChangeText={(text: string) =>
            setInputValue(text.replace(/^0+/, ''))
          }
          value={value?.number}
          keyboardType="phone-pad"
          placeholder={placeholder}
          placeholderTextColor={Color.White || placeholderTextColor}
          style={styles.textInput}
        />
      </View>
    );
  }, [
    codeCountryPicker,
    error,
    placeholder,
    placeholderTextColor,
    value?.number,
  ]);

  useEffect(() => {
    let formattedPhoneNumber = inputValue;
    const countryCode = getCountryCode();

    if (inputValue && formattedPhoneNumber[0] !== '+' && countryCode !== null) {
      formattedPhoneNumber = `+${countryCode.toString()}${formattedPhoneNumber.toString()}`;
    }

    const phoneNumberValue: PhoneNumberType = {
      iso2,
      number: inputValue,
      formattedNumber: formattedPhoneNumber,
      countryCode,
    };

    if (onChangeText) {
      onChangeText(phoneNumberValue);
    }
  }, [getCountryCode, inputValue, iso2, onChangeText]);

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        color={Color.White}
        size={18}
        mb={12}
        style={{ marginHorizontal: 4 }}>
        {label}
      </Text>
      {RenderTextInput()}
      <CountryPicker
        showCountryPicker={showCountryPicker}
        setShowCountryPicker={setShowCountryPicker}
        selectedCountryValue={iso2}
        selectCountry={selectCountry}
      />
      {!!error && (
        <Text size={12} color={Color.Pigment} mt={5}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dialCode: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingStart: 16,
  },
  input: {
    alignItems: 'center',
    backgroundColor: Color.Jacarta,
    borderRadius: 16,
    flexDirection: 'row',
  },
  textInput: {
    alignSelf: 'center',
    color: Color.White,
    flexGrow: 1,
    fontFamily: 'TheSansArabic-Plain',
    fontSize: 17,
    minHeight: 50,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
