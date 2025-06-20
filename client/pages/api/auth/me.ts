import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // First try to get token from Authorization header
  let token = req.headers.authorization?.replace('Bearer ', '');
  
  // If not found, try to get from httpOnly cookie
  if (!token) {
    token = req.cookies.token;
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  try {
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
