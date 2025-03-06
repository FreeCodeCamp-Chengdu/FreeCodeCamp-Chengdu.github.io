import { Option, Select } from 'idea-react';
import { observer } from 'mobx-react';
import { FC } from 'react';

import { i18n, LanguageName } from '../../models/Translation';

const LanguageMenu: FC = observer(() => {
  const { currentLanguage } = i18n;

  return (
    <Select
      value={currentLanguage}
      onChange={key => i18n.changeLanguage(key as typeof currentLanguage)}
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
