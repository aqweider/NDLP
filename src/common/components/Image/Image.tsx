import FastImage, {
  Source,
  ResizeMode,
  ImageStyle,
} from 'react-native-fast-image';
import {StyleProp} from 'react-native';
type ImageProps = {
  source: Source;
  resizeMode?: ResizeMode;
  style?: StyleProp<ImageStyle>;
};

export const Image = ({style, source, resizeMode = 'contain'}: ImageProps) => (
  <FastImage style={style} source={source} resizeMode={resizeMode} />
);
