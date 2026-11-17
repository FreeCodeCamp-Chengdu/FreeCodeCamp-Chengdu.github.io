import { Combobox, ComboboxOption } from 'idea-react';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { I18nContext, LanguageCode, LanguageName } from '../../models/Translation';

const LanguageMenu: FC = observer(() => {
  const i18n = useContext(I18nContext);

  return (
    <Combobox
      name="language"
      value={i18n.currentLanguage}
      onChange={language => i18n.loadLanguages(language as LanguageCode)}
    >
      {Object.entries(LanguageName).map(([key, name]) => (
        <ComboboxOption key={key} value={key}>
          {name}
        </ComboboxOption>
      ))}
    </Combobox>
  );
});

export default LanguageMenu;
