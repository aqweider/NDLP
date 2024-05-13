declare module 'react-native-theming' {
  import {
    ImageStyle,
    TextStyle,
    ViewStyle,
    View,
    Image,
    ImageBackground,
    Text,
  } from 'react-native';

  type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

  export function createStyle<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>,
  ): T;

  export type ThemeType = { apply(): void };

  type themeVariables<T> = { [P in keyof T]: T[P] };

  export function createTheme<T>(
    variables: themeVariables<T>,
    themeName: string,
  ): ThemeType;

  export function createThemedComponent<P>(
    Comp: React.ComponentType<P>,
    props?: Array<string>,
  ): React.ComponentType<P>;

  export default {
    View,
    Image,
    Text,
    ImageBackground,
  };
}
