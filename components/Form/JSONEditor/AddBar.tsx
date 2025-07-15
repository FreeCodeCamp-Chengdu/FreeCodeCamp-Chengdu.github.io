import { Icon } from 'idea-react';
import { FC } from 'react';
import { Button } from 'react-bootstrap';

const type_map = {
  string: { title: 'Inline text', icon: 'input-cursor' },
  text: { title: 'Rows text', icon: 'text-left' },
  object: { title: 'Key-value list', icon: 'list-ul' },
  array: { title: 'Ordered list', icon: 'list-ol' },
};

export interface AddBarProps {
  onSelect: (type: string) => void;
}

export const AddBar: FC<AddBarProps> = ({ onSelect }) => (
  <nav className="d-flex gap-1">
    {Object.entries(type_map).map(([key, { title, icon }]) => (
      <Button
        key={key}
        size="sm"
        variant="success"
        title={title}
        onClick={onSelect.bind(null, key)}
      >
        <Icon name={icon} />
      </Button>
    ))}
  </nav>
);
