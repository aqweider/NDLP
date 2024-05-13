import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type CountryType = {
  name: string;
  iso2: string;
  dialCode: string;
  priority: number;
  areaCodes: Array<string>;
};
export type PhoneNumberType = {
  iso2: string;
  number: string;
  formattedNumber: string;
  countryCode: string | null;
};
export type PhoneInputProps = {
  label?: string;
  required?: boolean;
  customContainerStyle?: ViewStyle;
  textInputStyle?: TextStyle;
  placeholder?: string;
  placeholderTextColor?: string;
  initialCountry?: string;
  countryCode?: string | null;
  onChangePhoneNumber?: (arg0: string) => void;
  value?: PhoneNumberType;
  style?: ViewStyle | TextStyle;
  flagStyle?: ImageStyle;
  textStyle?: TextStyle;
  offset?: number;
  textProps?: object;
  onSelectCountry?: (arg0: string) => void;
  onPressCancel?: () => void;
  onPressConfirm?: () => void;
  onChangeText: (phoneNumber: PhoneNumberType) => void;
  onPressFlag?: (arg0: string) => void;
  pickerButtonColor?: string;
  pickerBackgroundColor?: string;
  pickerItemStyle?: ViewStyle;
  countriesList?: Array<CountryType>;
  cancelText?: string;
  cancelTextStyle?: TextStyle;
  confirmText?: string;
  confirmTextTextStyle?: TextStyle;
  pickerButtonTextStyle?: TextStyle;
  confirmTextStyle?: TextStyle;
  disabled?: boolean;
  allowZeroAfterCountryCode?: boolean;
  error?: string;
};
export type countryType = {
  iso2: string;
  name: string;
};
export type countryPickerType = {
  pickerButtonColor?: string;
  pickerButtonTextStyle?: TextStyle;
  cancelText?: string;
  confirmText?: string;
  pickerBackgroundColor?: string;
  pickerItemStyle?: ViewStyle;
  onPressCancel?: () => void;
  onPressConfirm?: () => void;
  showCountryPicker: boolean;
  setShowCountryPicker: (value: boolean) => void;
  selectedCountryValue?: string;
  selectCountry: (value: string) => void;
};
