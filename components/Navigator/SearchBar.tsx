import { observer } from 'mobx-react';
import { FC, useContext } from 'react';
import {
  Button,
  Form,
  FormControlProps,
  FormProps,
  InputGroup,
  InputGroupProps,
} from 'react-bootstrap';

import { I18nContext } from '../../models/Translation';
import styles from './SearchBar.module.less';

export interface SearchBarProps
  extends Omit<FormProps, 'onChange'>,
    Pick<InputGroupProps, 'size'>,
    Pick<
      FormControlProps,
      'name' | 'placeholder' | 'defaultValue' | 'value' | 'onChange'
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
          <Form.Control
            className={expanded ? '' : styles.input}
            type="search"
            {...{ name, placeholder, defaultValue, value, onChange }}
          />
          <Button type="submit" variant="light">
            🔍
          </Button>
        </InputGroup>
      </Form>
    );
  },
);
