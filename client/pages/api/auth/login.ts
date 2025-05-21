import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  // Forward request to backend FastAPI server
  try {
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await backendRes.json();
    if (backendRes.ok && data.access_token) {
      // Set the token as an httpOnly cookie
      res.setHeader(
        'Set-Cookie',
        serialize('token', data.access_token, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
      );
    }
    res.status(backendRes.status).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
