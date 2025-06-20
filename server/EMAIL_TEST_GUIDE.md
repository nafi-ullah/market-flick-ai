# Email Configuration Testing Guide

This guide explains how to test your email service configuration for Market Flick AI's authentication system.

## Testing Your Email Configuration

We support multiple email providers to ensure reliable email delivery for critical authentication workflows.

1. First, ensure you've set up your preferred email provider:
   ```bash
   ./setup_email.sh
   ```

2. Run the email service test script:
   ```bash
   python test_email_service.py
   ```

3. Follow the prompts to select which type of email to test:
   - Generic test email
   - Verification email template
   - Password reset email template

## Available Email Providers

Our system supports multiple email service providers:

### 1. SMTP Configuration

For traditional SMTP (Gmail, Outlook, etc.):

1. Ensure you've configured your SMTP settings in `.env`:
   ```
   EMAIL_PROVIDER="smtp"
   EMAIL_SERVER="smtp.gmail.com"
   EMAIL_PORT="587"
   EMAIL_USERNAME="your-email@gmail.com"
   EMAIL_PASSWORD="your-app-password"
   ```

2. For Gmail, you'll need to:
   - Enable 2-step verification
   - Create an App Password
   - Use the App Password in your configuration

### 2. Amazon SES Configuration

For Amazon Simple Email Service:

1. Ensure you've configured your AWS settings in `.env`:
   ```
   EMAIL_PROVIDER="ses"
   AWS_ACCESS_KEY_ID="your-access-key"
   AWS_SECRET_ACCESS_KEY="your-secret-key"
   AWS_REGION="us-east-1"
   EMAIL_SENDER="your-verified-email@example.com"
   ```

2. Make sure your sender email is verified in your AWS SES console
3. If your account is in sandbox mode, verify recipient emails too

## Understanding Test Results

When you run `test_email_service.py`, you'll see detailed logs of the email sending process:

- Provider selection (SMTP or SES)
- Connection to the email server
- Any errors encountered
- Success or failure status

## Common Issues

### SMTP Issues

- **Authentication errors**: Check your username and password
- **Security settings**: Some email providers require specific security settings
- **App passwords**: Gmail and others may require app-specific passwords
- **Port blocking**: Some networks block SMTP ports

For Gmail specifically:
1. Enable 2-step verification at https://myaccount.google.com/security
2. Create an App Password at https://myaccount.google.com/apppasswords
3. Use the generated password in your `.env` file

### Amazon SES Issues

- **Sandbox mode**: New SES accounts are in sandbox mode (limited recipients)
- **Sender verification**: Ensure your sender email is verified in SES
- **IAM permissions**: Check that your IAM user has proper SES permissions
- **Rate limiting**: SES has sending quotas for new accounts

## Alternative Email Testing

For quick tests, you can also use Python's built-in `smtplib` to verify your configuration:

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Email settings
smtp_server = os.getenv("EMAIL_SERVER", "smtp.gmail.com")
smtp_port = int(os.getenv("EMAIL_PORT", "587"))
username = os.getenv("EMAIL_USERNAME", "")
password = os.getenv("EMAIL_PASSWORD", "")
sender = os.getenv("EMAIL_SENDER", "no-reply@marketflick.ai")

# Test recipient
recipient = input("Enter test recipient email: ")

# Create message
msg = MIMEMultipart()
msg["Subject"] = "Test Email from Market Flick AI"
msg["From"] = sender
msg["To"] = recipient

# Add content
text = "This is a test email to verify your SMTP configuration."
html = """
<html>
<body>
    <h1>Email Configuration Test</h1>
    <p>This is a test email to verify your SMTP configuration is working correctly.</p>
</body>
</html>
"""
msg.attach(MIMEText(text, "plain"))
msg.attach(MIMEText(html, "html"))

# Send email
try:
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(username, password)
    server.sendmail(sender, recipient, msg.as_string())
    server.quit()
    print("Email sent successfully!")
except Exception as e:
    print(f"Error: {e}")
```

## Comparing Email Providers

| Feature | SMTP | Amazon SES |
|---------|------|------------|
| Setup complexity | Moderate | Moderate |
| Deliverability | Varies by provider | High |
| Rate limits | Provider dependent | Higher quotas |
| Analytics | No | Yes |
| Cost | Often free | Pay per email |
| Fallback option | Limited | Yes |

## Which Method to Choose?

- **For development**: Either option works, or use `SKIP_EMAIL_VERIFICATION=true`
- **For production**: Amazon SES is recommended for better deliverability and analytics
- **For simplicity**: SMTP with a reliable provider like Gmail is easier to set up initially

## Next Steps

After successfully testing your email configuration:

1. Update the `.env` file for production with proper settings
2. Set `SKIP_EMAIL_VERIFICATION="false"` to enforce email verification
3. Test the complete authentication flow from signup to verification
