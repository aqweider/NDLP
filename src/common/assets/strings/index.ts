import { createResource } from '@/src/i18n/createResource';

import ar from './ar.json';
import en from './en.json';
import fr from './fr.json';
import de from './de.json';
import zh from './zh.json';
import ja from './ja.json';
import ko from './ko.json';

export const commonStrings = createResource('common', { en, ar, fr, de, zh, ja, ko });
