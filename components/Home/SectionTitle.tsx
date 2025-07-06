import { FC, PropsWithChildren } from 'react';

export const SectionTitle: FC<PropsWithChildren> = ({ children }) => (
  <>
    <h2 className="text-center mb-4 text-dark">{children}</h2>

    <div className="d-flex justify-content-center mb-4">
      <div className="border-bottom border-warning w-25" />
    </div>
  </>
);
