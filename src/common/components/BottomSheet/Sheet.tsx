/* eslint-disable no-null/no-null */
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import { useHideBar } from '@/src/app/hooks/useHideBar';
import { Color } from '@/src/theme/const';

export type Props = {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  snapPoints: string[];
  close?: boolean;
  navigation?: any;
  backgroundColor?: Color;
};
export const Sheet: FC<Props> = ({
  children,
  isVisible = false,
  onClose,
  snapPoints,
  close,
  backgroundColor,
}: Props) => {
  const { setShowTab } = useHideBar();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={0.5}
      />
    ),
    [],
  );
  useEffect(() => {
    console.log('isvisable ', isVisible);
    
    if (isVisible) {
      bottomSheetRef.current?.expand();
      setShowTab('none');
    } else {
      bottomSheetRef.current?.close();
      setShowTab('flex');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  useEffect(() => {
    if (close) {
      bottomSheetRef.current?.close();
    }
  }, [close]);
  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      enablePanDownToClose
      index={-1}
      backgroundStyle={{ backgroundColor: backgroundColor || Color.Jacarta }}
      onClose={() => {
        onClose();
        setShowTab('flex');
      }}
      handleIndicatorStyle={styles.indicator}
      backdropComponent={renderBackdrop}>
      {children}
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  indicator: {
    backgroundColor: Color.White,
    borderRadius: 16,
    marginTop: 16,
    width: 39,
  },
});
