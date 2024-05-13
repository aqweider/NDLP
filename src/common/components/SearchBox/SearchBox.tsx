import React, { Dispatch, SetStateAction } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput } from 'react-native';

import { Icon, View } from '@/src/common/components';
import { Color } from '@/src/theme/const';

export type SearchBoxProps = {
  searchPhrase: string;
  setSearchPhrase: Dispatch<SetStateAction<string>>;
};

export const SearchBox: React.FC<SearchBoxProps> = ({
  searchPhrase,
  setSearchPhrase,
}: SearchBoxProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {/* search Icon */}
        <Icon name="search" size={30} color={Color.Primary} type="Ionicons" />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          placeholderTextColor={Color.Primary}
          onChangeText={setSearchPhrase}
        />
        {searchPhrase !== '' && (
          <Pressable
            onPress={() => {
              setSearchPhrase('');
              Keyboard.dismiss();
            }}
            style={styles.closeContainer}>
            <Icon name="cross" size={20} color={Color.White} type="Entypo" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  closeContainer: {
    alignItems: 'center',
    backgroundColor: Color.Primary,
    borderRadius: 10.5,
    height: 21,
    justifyContent: 'center',
    width: 21,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 16,
  },
  input: {
    color: Color.Primary,
    fontFamily: 'TheSansArabic-Bold',
    fontSize: 20,
    marginHorizontal: 20,
    width: '90%',
  },
  searchBar: {
    alignItems: 'center',
    backgroundColor: Color.White,
    borderColor: Color.Black,
    borderRadius: 5,
    borderWidth: 2,
    flexDirection: 'row',
    height: 53,
    justifyContent: 'space-evenly',
    paddingHorizontal: 26,
    width: '100%',
  },
});
