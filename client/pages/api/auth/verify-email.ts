import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { token } = req.query;
  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Token is required' });
  }
  try {
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-email?token=${encodeURIComponent(token)}`);
    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
