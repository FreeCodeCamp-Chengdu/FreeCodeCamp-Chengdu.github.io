import { TranslationModel } from 'mobx-i18n';

import zhCN from '../translation/zh-CN';

export const i18n = new TranslationModel({
  'zh-CN': zhCN,
  'zh-TW': () => import('../translation/zh-TW'),
  'en-US': () => import('../translation/en-US'),
});

export const { t } = i18n;

export const LanguageName: Record<(typeof i18n)['currentLanguage'], string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'en-US': 'English',
};
