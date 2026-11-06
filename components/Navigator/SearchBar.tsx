import {
  Button,
  Form,
  FormControl,
  FormControlProps,
  FormProps,
  InputGroup,
  InputGroupProps,
} from 'idea-react';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';
import styles from './SearchBar.module.less';

export interface SearchBarProps
  extends
    Omit<FormProps, 'onChange'>,
    Partial<Pick<InputGroupProps, 'size'>>,
    Partial<
      Pick<FormControlProps, 'name' | 'placeholder' | 'defaultValue' | 'value' | 'onChange'>
    > {
  expanded?: boolean;
}

export const SearchBar: FC<SearchBarProps> = observer(
  ({
    action = '/search',
    size,
    name = 'keywords',
    placeholder,
    expanded = true,
    defaultValue,
    value,
    onChange,
    ...props
  }) => {
    const { t } = useContext(I18nContext);

    placeholder ??= t('keywords');

    return (
      <Form {...{ action, ...props }}>
        <InputGroup size={size}>
          <FormControl
            className={expanded ? '' : styles.input}
            type="search"
            {...{ name, placeholder, defaultValue, value, onChange }}
          />
          <Button type="submit" theme="light">
            🔍
          </Button>
        </InputGroup>
      </Form>
    );
  },
);
