# Email Verification Configuration Guide

## Overview

This document explains how to configure email verification for the Market Flick AI authentication system. Our system supports multiple email providers for sending verification emails during signup and password reset processes.

## Email Service Integration

We've implemented a flexible email delivery system that allows choosing between different email providers while maintaining the option to bypass email verification in development environments.

### Supported Email Providers

1. **SMTP** - Use standard SMTP for services like Gmail, Outlook, etc.
2. **Amazon SES** - Use Amazon's Simple Email Service for improved deliverability

### Configuration Options

In your `.env` file, set the following variables:

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

### Quick Setup

Run the setup script from the server directory for guided configuration:

```bash
chmod +x setup_email.sh
./setup_email.sh
```

This interactive script will guide you through configuring your preferred email service provider.

### How It Works

1. When `SKIP_EMAIL_VERIFICATION` is set to `true`:
   - Users are automatically marked as verified during signup
   - No verification emails are sent (but the system will attempt to send emails for testing)
   - Users can immediately log in after signup

2. When `SKIP_EMAIL_VERIFICATION` is set to `false`:
   - Users need to verify their email before logging in
   - The system will send verification emails using your configured provider
   - You must provide valid credentials for your chosen email provider

## Setting Up Email Providers

### Option 1: SMTP (Gmail, Outlook, etc.)

1. Configure your email account to allow application access
   - For Gmail, you may need to:
     - Enable 2-factor authentication
     - Create an App Password
2. Set `EMAIL_PROVIDER="smtp"` in your `.env` file
3. Configure the SMTP settings in your `.env` file
4. Set `SKIP_EMAIL_VERIFICATION` to `false` for production

### Option 2: Amazon SES

1. Create an AWS account if you don't have one
2. Set up Amazon SES in your AWS console
3. Verify your sender email address in SES
4. Create an IAM user with SES permissions
5. Generate access keys for the IAM user
6. Set `EMAIL_PROVIDER="ses"` in your `.env` file
7. Add your AWS credentials to the `.env` file
8. Set `SKIP_EMAIL_VERIFICATION` to `false` for production

### Testing Your Configuration

You can test your email configuration by running:

```bash
python test_email_service.py
```

This script will allow you to:
1. Select your desired test (generic email, verification email, or password reset)
2. Enter a recipient email address
3. Send a test email using your configured provider

## Enhanced Email Templates

Our system includes professionally designed HTML email templates for:
- Account verification emails
- Password reset emails

These templates are responsive and include:
- Clean, modern design
- Clear call-to-action buttons
- Plain-text fallback content
- Expiration information for security

## Troubleshooting

If emails are not being sent:

1. Check that credentials are correctly set in your `.env` file
2. Look for error messages in the server logs
3. Try running `test_email_service.py` to debug email sending
4. Check if the recipient's email provider is blocking emails

### SMTP Specific Issues

- **Authentication errors**: Check your username and password
- **Security settings**: Some email providers require specific security settings
- **App passwords**: Gmail and others may require app-specific passwords
- **Port blocking**: Some networks block SMTP ports

### Amazon SES Specific Issues

- **Sandbox mode**: New SES accounts are in sandbox mode (limited recipients)
- **Sender verification**: Ensure your sender email is verified in SES
- **IAM permissions**: Check that your IAM user has proper SES permissions
- **Rate limiting**: SES has sending quotas for new accounts

## Advanced Configuration

### Email Template Customization

You can modify the email templates in `utils/email_templates.py` to customize:
- Logo and branding
- Color scheme
- Message content
- Footer information

### Fallback Strategy

Our system implements a fallback mechanism:
- If your primary email provider fails, the system will attempt to use SMTP as a fallback
- This ensures maximum reliability for critical authentication emails

### Adding New Providers

The system is designed to be extensible. To add support for new email providers:
1. Add the provider implementation in `utils/email_service.py`
2. Update the `setup_email.sh` script to include the new provider
3. Update documentation in this file

## Security Considerations

- Email verification tokens expire after 24 hours
- Password reset tokens expire after 1 hour
- Sensitive user data is never included in emails
- Email templates use HTTPS links when possible
- Plain text alternatives are provided for all HTML emails

## Additional Resources

- [Amazon SES Documentation](https://docs.aws.amazon.com/ses/)
- [SMTP Protocol Reference](https://tools.ietf.org/html/rfc5321)
- [Email HTML Best Practices](https://www.litmus.com/blog/email-coding-best-practices/)
- [AWS SDK for Python (boto3)](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/ses.html)

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
