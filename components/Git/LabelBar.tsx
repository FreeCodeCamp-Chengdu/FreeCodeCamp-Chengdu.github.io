import { Issue } from 'mobx-github';
import { FC } from 'react';

export type LabelBarProps = Pick<Issue, 'labels'>;

export const LabelBar: FC<LabelBarProps> = ({ labels }) => (
  <ul className="list-unstyled d-flex flex-wrap gap-2">
    {labels.map((label, index) => {
      const { name, color } = typeof label === 'object' ? label : {};

      return (
        <li
          key={index}
          className="p-2 rounded small"
          style={{ backgroundColor: color || 'lightgray' }}
        >
          {typeof label === 'string' ? label : name}
        </li>
      );
    })}
  </ul>
);
