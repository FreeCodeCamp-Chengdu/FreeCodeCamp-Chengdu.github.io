import React, { FC } from 'react';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: FC<SectionTitleProps> = ({ title }) => (
  <>
    <h2 className="text-center mb-4 text-dark">{title}</h2>
    <div className="d-flex justify-content-center mb-4">
      <div className="border-bottom border-warning w-25" />
    </div>
  </>
);
