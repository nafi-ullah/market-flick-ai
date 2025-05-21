# Email Verification Configuration Guide

## Overview

This document explains how to configure email verification for the Market Flick AI authentication system.

## Current Solution

We've implemented a system that allows bypassing email verification for development environments while maintaining the option to enable it in production.

### Configuration Options

In your `.env` file, set the following variables:

```
# Email configuration
EMAIL_SENDER="no-reply@marketflick.ai"
EMAIL_SERVER="smtp.gmail.com"  # Or your preferred SMTP server
EMAIL_PORT="587"               # Adjust according to your SMTP server
EMAIL_USERNAME=""              # Your email username/address
EMAIL_PASSWORD=""              # Your email password or app password

# Development settings
SKIP_EMAIL_VERIFICATION="true" # Set to "false" to enforce email verification
```

### How It Works

1. When `SKIP_EMAIL_VERIFICATION` is set to `true`:
   - Users are automatically marked as verified during signup
   - No verification emails are sent
   - Users can immediately log in after signup

2. When `SKIP_EMAIL_VERIFICATION` is set to `false`:
   - Users need to verify their email before logging in
   - The system will attempt to send verification emails
   - You must provide valid `EMAIL_USERNAME` and `EMAIL_PASSWORD` credentials

## Setting Up Email Credentials

To enable email verification in production:

1. Set up an email account for sending verification emails
2. For Gmail, you might need to:
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password in the `EMAIL_PASSWORD` field
3. Update the `.env` file with your credentials
4. Set `SKIP_EMAIL_VERIFICATION` to `false`

## Troubleshooting

If you encounter email delivery issues:
1. Check your email credentials
2. Ensure your email provider allows SMTP access
3. Check firewall settings
4. Verify the port number is correct for your provider
5. For development, keep `SKIP_EMAIL_VERIFICATION="true"`

## Security Considerations

- Always use secure credentials in production
- Never commit sensitive email credentials to version control
- Consider using environment variables instead of .env files in production
