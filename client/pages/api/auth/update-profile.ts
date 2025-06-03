import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
