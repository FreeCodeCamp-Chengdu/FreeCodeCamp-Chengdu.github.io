import { TableCellValue } from 'mobx-lark';
import { FC } from 'react';
import { Image, ImageProps } from 'react-bootstrap';

import { DefaultImage, fileURLOf } from '../pages/api/Lark/file/[id]';

export interface LarkImageProps extends Omit<ImageProps, 'src'> {
  src?: TableCellValue;
}

export const LarkImage: FC<LarkImageProps> = ({
  src = DefaultImage,
  alt,
  ...props
}) => (
  <Image
    fluid
    loading="lazy"
    {...props}
    src={fileURLOf(src, true)}
    alt={alt}
    onError={({ currentTarget: image }) => {
      const path = fileURLOf(src),
        errorURL = decodeURI(image.src);

      if (!path) return;

      if (errorURL.endsWith(path)) {
        if (!alt) image.src = DefaultImage;
      } else if (!errorURL.endsWith(DefaultImage)) {
        image.src = path;
      }
    }}
  />
);
