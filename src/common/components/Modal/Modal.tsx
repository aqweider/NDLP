import React from 'react';
import {
  Modal as RNModal,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import CloseIcon from '@/src/app/assets/icons/close-square.svg';
import { Text, View } from '@/src/common/components';
import { Color } from '@/src/theme/const';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};
export const Modal = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal visible={isVisible} animationType="slide" {...props}>
      <View style={styles.container}>{children}</View>
    </RNModal>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);
const ModalClosingHeader = ({
  onClosePress,
  title,
}: {
  onClosePress: () => void;
  title?: string;
}) => (
  <View style={styles.closingHeader}>
    <Pressable onPress={onClosePress} style={styles.iconContainer}>
      <CloseIcon width={32} height={32} />
    </Pressable>
    <View style={styles.closingHeaderTitle}>
      <Text size={22} bold>
        {title}
      </Text>
    </View>
  </View>
);
const ModalHeader = ({
  title,
  color = Color.Black,
}: {
  title: string;
  color?: string;
}) => (
  <View style={styles.header}>
    <Text style={[styles.text, { color }]} bold>
      {title}
    </Text>
  </View>
);

const ModalBody = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}) => <View style={[styles.body, style]}>{children}</View>;

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  body: {
    flex: 1,
    minHeight: 100,
  },

  closingHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  closingHeaderTitle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Color.DarkGunMetal,
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginTop: 25,
    zIndex: 10,
  },
  text: {
    fontSize: 22,
    paddingTop: 10,
  },
});
Modal.ClosingHeader = ModalClosingHeader;
Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
