// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import { safeAPI } from './core';

type Data = {
  name: string;
};

export default safeAPI(async (req, res: NextApiResponse<Data>) =>
  res.status(401).json({ name: 'John Doe' }),
);
