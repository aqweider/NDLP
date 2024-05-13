import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  TextInput as TextInputComponent,
  TextInputProps,
  TextStyle,
} from 'react-native';

import { Color, FontFamily } from '@/src/theme/const';

import { PhoneInput } from '../phoneInput';
import { Text } from '../Text/Text';
import { View } from '../View';

// type TextInputProps = ComponentProps<typeof TextInputComponent>;
interface Props extends TextInputProps {
  phoneTextInput?: boolean;
  label?: string;
  required?: boolean;
  errorMsg?: string;
  placeHolderStyle?: TextStyle;
}

export const TextInput: React.FC<Props> = ({
  phoneTextInput,
  style,
  label,
  required,
  errorMsg,
  placeholder,
  placeHolderStyle,
  ...props
}: Props) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  console.log(errorMsg, 'error');

  return phoneTextInput ? (
    <View>
      <PhoneInput
        label={label}
        placeholder={placeholder}
        onChangeText={value => {
          const number = value.formattedNumber.replace(/\s/g, '');

          const newPhone = number.replace(
            /[٠١٢٣٤٥٦٧٨٩]/g,
            function (d: string, ...args: any[]) {
              // eslint-disable-next-line unicorn/prefer-code-point
              return (d.charCodeAt(0) - 1632).toString(); // Convert Arabic numbers
            },
          );
          props?.onChangeText?.(newPhone);
        }}
        error={errorMsg}
      />
    </View>
  ) : (
    <View style={{ marginBottom: 24 }}>
      {!!label && (
        <View style={{ flexDirection: 'row' }}>
          <Text
            color={Color.White}
            size={18}
            mb={12}
            style={{ marginHorizontal: 4 }}>
            {label}
          </Text>
          {required && (
            <Text size={20} color={Color.Pigment}>
              *
            </Text>
          )}
        </View>
      )}
      <TextInputComponent
        placeholderTextColor={Color.White}
        style={[
          styles.textInput,
          isRtl ? styles.rtl : styles.ltr,
          !!errorMsg && { borderColor: Color.Pigment, borderWidth: 1 },
          style,
          props.value?.length === 0 && placeHolderStyle,
        ]}
        placeholder={placeholder}
        {...props}
      />
      {!!errorMsg && (
        <Text size={12} color={Color.Pigment} mt={5}>
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  codeContainer: {
    alignItems: 'center',
    borderColor: Color.whiteGrey,
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
  ltr: {
    textAlign: 'left',
  },
  phoneTextInput: {
    flexDirection: 'row',
  },
  rtl: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  textInput: {
    backgroundColor: Color.Jacarta,
    borderRadius: 16,
    color: Color.White,
    fontFamily: FontFamily.default,
    fontSize: 17,
    padding: 16,
    width: '100%',
  },
  textInputWithText: {
    borderWidth: 0,
    color: Color.Jacarta,
    flex: 1,
    fontFamily: FontFamily.default,
    fontSize: 16,
  },
});
