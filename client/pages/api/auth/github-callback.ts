import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ message: 'Code is required' });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return res.status(400).json({ message: 'Failed to get access token' });
    }

    // Login with the token via our social-login endpoint
    const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: 'github',
        token: accessToken,
      }),
    });

    const loginData = await loginResponse.json();

    // Get the original redirect location
    const redirectPath = req.cookies.auth_redirect || '/';
    
    // Set the token in a cookie
    res.setHeader(
      'Set-Cookie',
      `token=${loginData.access_token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}` // 7 days
    );

    // Redirect back to the app
    res.redirect(302, redirectPath);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.status(500).json({ message: 'Failed to authenticate with GitHub' });
  }
}
