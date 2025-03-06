import { observer } from 'mobx-react';
import { FC } from 'react';
import {
  Button,
  Form,
  FormControlProps,
  FormProps,
  InputGroup,
  InputGroupProps,
} from 'react-bootstrap';

import { t } from '../../models/Translation';
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
    placeholder = t('keywords'),
    expanded = true,
    defaultValue,
    value,
    onChange,
    ...props
  }) => (
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
  ),
);
