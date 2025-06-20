import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    serialize('token', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0),
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );
  res.status(200).json({ message: 'Logged out' });
}
