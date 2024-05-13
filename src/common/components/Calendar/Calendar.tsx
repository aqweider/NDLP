import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import { StyleSheet } from 'react-native';
import {
  Calendar as CalendarComponent,
  CalendarProps as CalendarComponentProps,
} from 'react-native-calendars';

import { Color } from '@/src/theme/const';

import { View } from '../View';

export type CalendarProps = {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
};
export const Calendar: FC<CalendarProps> = ({
  selectedDate,
  setSelectedDate,
}: CalendarProps) => {
  const INITIAL_DATE = new Date().toString();

  const onDayPress: CalendarComponentProps['onDayPress'] = useCallback(
    (day: any) => {
      setSelectedDate(day.dateString);
    },
    [setSelectedDate],
  );
  const marked = useMemo(() => {
    return {
      [selectedDate]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: Color.Black,
        selectedTextColor: Color.White,
      },
    };
  }, [selectedDate]);
  return (
    <View style={styles.container}>
      <CalendarComponent
        current={INITIAL_DATE}
        horizontal={true}
        pagingEnabled={true}
        onDayPress={onDayPress}
        monthFormat="yyyy MM"
        enableSwipeMonths={true}
        markedDates={marked}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    paddin: 15,
    width: '100%',
  },
});
