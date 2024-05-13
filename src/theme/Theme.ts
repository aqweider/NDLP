import { mapValues } from 'lodash';
import { createTheme, ThemeType } from 'react-native-theming';

import { storage } from '@/src/storage';
import { themes as appThemes } from '@/src/theme/themes';

type ThemeNames = keyof typeof appThemes;

class Theme {
  #currentTheme?: ThemeType;

  #themes: Dict<ThemeType> = {};

  init = () => {
    this.#themes = mapValues(appThemes, (theme, name) =>
      createTheme(theme, name),
    );
    this.restore();
  };

  /**
   * gets current theme
   */
  get = () => this.#currentTheme;

  /**
   * sets current theme
   */
  set = (themeName: ThemeNames) => {
    this.#currentTheme = this.#themes[themeName];
    this.#currentTheme.apply();
    storage.set('theme', themeName);
  };

  /**
   * restore form storage
   */
  restore = () => {
    const themeName = storage.getString('theme');
    if (themeName) {
      this.#currentTheme = this.#themes[themeName];
      this.#currentTheme.apply();
    }
  };
}

export default new Theme();
