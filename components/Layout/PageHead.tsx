import Head from 'next/head';
import type { FC, PropsWithChildren } from 'react';

import { Name, Summary } from '../../models/configuration';

export type PageHeadProps = PropsWithChildren<{
  title?: string;
  description?: string;
}>;

export const PageHead: FC<PageHeadProps> = ({
  title,
  description = Summary,
  children,
}) => (
  <Head>
    <title>{`${title ? `${title} - ` : ''}${Name}`}</title>

    {description && <meta name="description" content={description} />}

    {children}
  </Head>
);
