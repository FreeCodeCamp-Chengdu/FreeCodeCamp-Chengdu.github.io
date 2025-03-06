import Head from 'next/head';
import type { FC, PropsWithChildren } from 'react';

export type PageHeadProps = PropsWithChildren<{
  title?: string;
  description?: string;
}>;

const Name = process.env.NEXT_PUBLIC_SITE_NAME,
  Summary = process.env.NEXT_PUBLIC_SITE_SUMMARY;

export const PageHead: FC<PageHeadProps> = ({
  title,
  description = Summary,
  children,
}) => (
  <Head>
    <title>{`${title}${title && ' - '}${Name}`}</title>

    {description && <meta name="description" content={description} />}

    {children}
  </Head>
);
