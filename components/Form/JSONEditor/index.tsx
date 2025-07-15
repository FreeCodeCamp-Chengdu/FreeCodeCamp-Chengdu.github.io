import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { DataObject } from 'mobx-restful';
import { ChangeEvent, Component, ReactNode } from 'react';
import { Form } from 'react-bootstrap';

import { AddBar } from './AddBar';

export interface DataMeta {
  type: string;
  key?: string | number;
  value: any;
  // eslint-disable-next-line no-restricted-syntax
  children?: DataMeta[];
}

export interface FieldProps {
  value: DataObject | any[] | null;
  onChange?: (event: FieldChangeEvent) => void;
}
export type FieldChangeEvent = ChangeEvent<{ value: FieldProps['value'] }>;

@observer
export class ListField extends Component<FieldProps> {
  @observable
  accessor innerValue = {} as DataMeta;

  componentDidMount() {
    this.innerValue = ListField.metaOf(this.props.value);
  }

  componentDidUpdate({ value }: Readonly<FieldProps>) {
    if (value !== this.props.value) this.componentDidMount();
  }

  static metaOf(value: any): DataMeta {
    if (value instanceof Array)
      return {
        type: 'array',
        value,
        children: Array.from(value, (value, key) => ({
          ...this.metaOf(value),
          key,
        })),
      };

    if (value instanceof Object)
      return {
        type: 'object',
        value,
        children: Object.entries(value).map(([key, value]) => ({
          ...this.metaOf(value),
          key,
        })),
      };

    return {
      type: /[\r\n]/.test(value) ? 'text' : 'string',
      value,
    };
  }

  addItem = (type: string) => {
    let item: DataMeta = { type, value: [] };
    const { innerValue } = this;

    switch (type) {
      case 'string':
        item = ListField.metaOf('');
        break;
      case 'text':
        item = ListField.metaOf('\n');
        break;
      case 'object':
        item = ListField.metaOf({});
        break;
      case 'array':
        item = ListField.metaOf([]);
    }

    this.innerValue = {
      ...innerValue,
      children: [...(innerValue.children || []), item],
    };
  };

  protected dataChange =
    (method: (item: DataMeta, newKey: string) => any) =>
    (index: number, { currentTarget: { value: data } }: ChangeEvent<any>) => {
      const { children = [] } = this.innerValue;

      const item = children[index];

      if (!item) return;

      method.call(this, item, data);

      this.props.onChange?.({
        currentTarget: { value: this.innerValue.value },
      } as FieldChangeEvent);
    };

  setKey = this.dataChange((item: DataMeta, newKey: string) => {
    const { value, children = [] } = this.innerValue;

    item.key = newKey;

    for (const oldKey in value)
      if (!children.some(({ key }) => key === oldKey)) {
        value[newKey] = value[oldKey];

        delete value[oldKey];

        return;
      }

    value[newKey] = item.value;
  });

  setValue = this.dataChange((item: DataMeta, newValue: any) => {
    const { value } = this.innerValue;

    if (newValue instanceof Array) newValue = [...newValue];
    else if (typeof newValue === 'object') newValue = { ...newValue };

    item.value = newValue;

    if (item.key != null) value[item.key + ''] = newValue;
    else if (value instanceof Array) item.key = value.push(newValue) - 1;
  });

  fieldOf(index: number, type: string, value: any) {
    switch (type) {
      case 'string':
        return (
          <Form.Control
            defaultValue={value}
            placeholder="Value"
            onBlur={this.setValue.bind(this, index)}
          />
        );
      case 'text':
        return (
          <Form.Control
            as="textarea"
            defaultValue={value}
            placeholder="Value"
            onBlur={this.setValue.bind(this, index)}
          />
        );
      default:
        return <ListField value={value} onChange={this.setValue.bind(this, index)} />;
    }
  }

  wrapper(slot: ReactNode) {
    const Tag = this.innerValue.type === 'array' ? 'ol' : 'ul';

    return <Tag className="list-unstyled d-flex flex-column gap-3">{slot}</Tag>;
  }

  render() {
    const { type: field_type, children = [] } = this.innerValue;

    return this.wrapper(
      <>
        <li>
          <AddBar onSelect={this.addItem} />
        </li>
        {children.map(({ type, key, value }, index) => (
          <li key={key} className="d-flex align-items-center gap-3">
            {field_type === 'object' && (
              <Form.Control
                defaultValue={key}
                required
                placeholder="Key"
                onBlur={this.setKey.bind(this, index)}
              />
            )}
            {this.fieldOf(index, type, value)}
          </li>
        ))}
      </>,
    );
  }
}
