import { Option, Select } from 'idea-react';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { I18nContext, LanguageName } from '../../models/Translation';

const LanguageMenu: FC = observer(() => {
  const i18n = useContext(I18nContext);

  return (
    <Select
      value={i18n.currentLanguage}
      onChange={key => i18n.loadLanguages(key as typeof i18n.currentLanguage)}
    >
      {Object.entries(LanguageName).map(([key, name]) => (
        <Option key={key} value={key}>
          {name}
        </Option>
      ))}
    </Select>
  );
});

export default LanguageMenu;
