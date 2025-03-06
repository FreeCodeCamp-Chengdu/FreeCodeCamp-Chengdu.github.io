import { ErrorProps } from 'next/error';
import { FC } from 'react';

import { i18n } from '../../models/Translation';

export const NotFoundCard: FC<ErrorProps> = ({ title }) =>
  i18n.currentLanguage.startsWith('zh') ? (
    <script
      src="//cdn.dnpw.org/404/v1.min.js"
      // @ts-expect-error https://www.dnpw.org/cn/pa-notfound.html
      jumptarget="/"
      jumptime="-1"
      error={title}
    />
  ) : (
    <iframe
      className="w-100 vh-100 border-0"
      src="https://notfound-static.fwebservices.be/en/404?key=66abb751ed312"
    />
  );
