# Email Service Integration Guide for Market Flick AI

This guide explains how to set up and use email services for user authentication in the Market Flick AI platform.

## Overview

Our authentication system requires sending emails for:
- Email verification during signup
- Password reset requests

Due to third-party provider restrictions, we've implemented a flexible system that supports multiple email service providers.

## Supported Email Providers

1. **SMTP** - Use standard SMTP for services like Gmail, Outlook, etc.
2. **Amazon SES** - Use Amazon's Simple Email Service for improved deliverability

## Quick Setup

1. Navigate to the server directory:
   ```bash
   cd /path/to/market-flick-ai-master/server
   ```

2. Ensure your virtual environment is active:
   ```bash
   source venv/bin/activate  # For Linux/Mac
   # OR
   .\venv\Scripts\activate  # For Windows
   ```

3. Run the email setup script:
   ```bash
   ./setup_email.sh
   ```

4. Follow the interactive prompts to configure your preferred email provider.

## Manual Configuration

If you prefer manual configuration, add the following to your `.env` file:

```
# Email configuration
EMAIL_PROVIDER="smtp"          # Options: "smtp", "ses" 
EMAIL_SENDER="no-reply@marketflick.ai"  # Your verified sender email
FRONTEND_URL="http://localhost:3000"    # URL for links in emails

# For SMTP
EMAIL_SERVER="smtp.gmail.com"  # Your SMTP server
EMAIL_PORT="587"               # Your SMTP port
EMAIL_USERNAME=""              # Your SMTP username/email
EMAIL_PASSWORD=""              # Your SMTP password

# For Amazon SES
AWS_ACCESS_KEY_ID=""           # Your AWS access key
AWS_SECRET_ACCESS_KEY=""       # Your AWS secret key
AWS_REGION="us-east-1"         # Your AWS region

# Development settings
SKIP_EMAIL_VERIFICATION="true" # Set to "false" to enforce email verification
```

## Email Provider Setup

### SMTP Setup (e.g., Gmail)

1. Configure your email account to allow less secure apps or create app password:
   - For Gmail:
     - Enable 2-step verification at https://myaccount.google.com/security
     - Create an App Password at https://myaccount.google.com/apppasswords
   - Use the generated app password in your `.env` file

2. Configure your `.env` file:
   ```
   EMAIL_PROVIDER="smtp"
   EMAIL_SERVER="smtp.gmail.com"
   EMAIL_PORT="587"
   EMAIL_USERNAME="your-email@gmail.com"
   EMAIL_PASSWORD="your-app-password"
   ```

### Amazon SES Setup

1. Create an AWS account if you don't have one
2. Go to the AWS SES Console
3. Verify your sender email address:
   - Navigate to "Verified identities" and click "Create identity"
   - Choose "Email address" and enter your sender email
   - Follow the verification steps (check your email for verification link)

4. Create an IAM user with SES permissions:
   - Go to IAM console
   - Create a new user with programmatic access
   - Attach the "AmazonSESFullAccess" policy

5. Generate and save access keys for the IAM user

6. Configure your `.env` file:
   ```
   EMAIL_PROVIDER="ses"
   EMAIL_SENDER="your-verified-email@example.com"
   AWS_ACCESS_KEY_ID="your-access-key"
   AWS_SECRET_ACCESS_KEY="your-secret-key"
   AWS_REGION="your-aws-region"
   ```

## Testing Your Configuration

After setting up your email provider, test it by running:

```bash
python test_email_service.py
```

Follow the prompts to send test emails.

## Development Mode

During development, you can skip email verification by setting:

```
SKIP_EMAIL_VERIFICATION="true"
```

This allows users to register and login without verifying their email address.

## Troubleshooting

If you encounter issues:

1. Check your `.env` file for correct credentials
2. Ensure your virtual environment has all required packages:
   ```bash
   pip install -r auth-requirements.txt
   ```
3. Look for error messages in the console output
4. Try running tests with detailed output:
   ```bash
   python test_email_service.py
   ```

For more detailed information, refer to the [EMAIL_VERIFICATION_README.md](server/EMAIL_VERIFICATION_README.md) file.
