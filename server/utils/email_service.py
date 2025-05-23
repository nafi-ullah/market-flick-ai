"""
Email service integration for Market Flick AI.
Supports multiple email providers including SMTP and Amazon SES.
"""
import os
from typing import Optional, Dict, Any, List
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
import emails
from emails.template import JinjaTemplate

# Load environment variables
load_dotenv()

# Email Configuration
EMAIL_SENDER = os.getenv("EMAIL_SENDER", "no-reply@marketflick.ai")
EMAIL_SERVER = os.getenv("EMAIL_SERVER", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME", "")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# AWS SES Configuration
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID", "")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "")
AWS_REGION = os.getenv("AWS_REGION", "us-east-1")

# Development Configuration
SKIP_EMAIL_VERIFICATION = os.getenv("SKIP_EMAIL_VERIFICATION", "false").lower() == "true"
EMAIL_PROVIDER = os.getenv("EMAIL_PROVIDER", "smtp").lower()  # Options: smtp, ses

def send_email_ses(to_email: str, subject: str, html_content: str, text_content: Optional[str] = None) -> bool:
    """Send email using Amazon SES.
    
    Args:
        to_email: The recipient's email address
        subject: The email subject
        html_content: The email content in HTML format
        text_content: Plain text alternative (optional)
        
    Returns:
        bool: True if the email was sent successfully, False otherwise
    """
    if not AWS_ACCESS_KEY or not AWS_SECRET_KEY:
        print("AWS credentials are not configured. Cannot send email via SES.")
        return False
        
    # Create SES client
    try:
        client = boto3.client(
            'ses',
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=AWS_REGION
        )
        
        # Create email message
        message = {
            'Subject': {
                'Data': subject
            },
            'Body': {
                'Html': {
                    'Data': html_content
                }
            }
        }
        
        # Add plain text alternative if provided
        if text_content:
            message['Body']['Text'] = {'Data': text_content}
            
        # Send the email
        response = client.send_email(
            Source=EMAIL_SENDER,
            Destination={
                'ToAddresses': [to_email]
            },
            Message=message
        )
        
        print(f"Email sent via SES! Message ID: {response['MessageId']}")
        return True
        
    except ClientError as e:
        print(f"Error sending email via SES: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error sending email via SES: {e}")
        return False

def send_email_smtp(to_email: str, subject: str, html_content: str) -> bool:
    """Send email using SMTP via emails library.
    
    Args:
        to_email: The recipient's email address
        subject: The email subject
        html_content: The email content in HTML format
        
    Returns:
        bool: True if the email was sent successfully, False otherwise
    """
    if not EMAIL_USERNAME or not EMAIL_PASSWORD:
        print("SMTP credentials are not configured. Cannot send email.")
        return False
        
    message = emails.Message(
        subject=subject,
        html=html_content,
        mail_from=(EMAIL_SENDER, "Market Flick AI")
    )
    
    try:
        response = message.send(
            to=to_email,
            smtp={
                "host": EMAIL_SERVER, 
                "port": EMAIL_PORT, 
                "user": EMAIL_USERNAME, 
                "password": EMAIL_PASSWORD, 
                "tls": True
            }
        )
        return response.status_code == 250
    except Exception as e:
        print(f"Error sending email via SMTP: {e}")
        return False

def send_email(to_email: str, subject: str, html_content: str, text_content: Optional[str] = None) -> bool:
    """Send email using configured provider or fallback to SMTP.
    
    Args:
        to_email: The recipient's email address
        subject: The email subject
        html_content: The email content in HTML format
        text_content: Plain text alternative (optional)
        
    Returns:
        bool: True if the email was sent successfully, False otherwise
    """
    # If email verification is skipped, print debug info but still try to send email
    if SKIP_EMAIL_VERIFICATION:
        print(f"Email verification is skipped, but still attempting to send email to {to_email}")
        return True
    
    # Try selected email provider
    if EMAIL_PROVIDER == 'ses':
        if send_email_ses(to_email, subject, html_content, text_content):
            return True
        # Fall back to SMTP if SES fails
        print("Falling back to SMTP...")
    
    # Default to SMTP
    return send_email_smtp(to_email, subject, html_content)

def send_verification_email(email: str, token: str, user_name: str = None) -> bool:
    """Send verification email to user.
    
    Args:
        email: The recipient's email address
        token: The verification token
        user_name: Optional name of the user
        
    Returns:
        bool: True if the email was sent successfully, False otherwise
    """
    from utils.email_templates import get_verification_email_template
    verification_url = f"{FRONTEND_URL}/auth/verify-email?token={token}"
    
    html_content = get_verification_email_template(verification_url, user_name)
    text_content = f"""
    Welcome to Market Flick AI!
    
    Please verify your email address by visiting:
    {verification_url}
    
    If you did not sign up for Market Flick AI, please ignore this email.
    """
    
    return send_email(email, "Verify your email address", html_content, text_content)

def send_password_reset_email(email: str, token: str, user_name: str = None) -> bool:
    """Send password reset email to user.
    
    Args:
        email: The recipient's email address
        token: The password reset token
        user_name: Optional name of the user
        
    Returns:
        bool: True if the email was sent successfully, False otherwise
    """
    from utils.email_templates import get_password_reset_template
    reset_url = f"{FRONTEND_URL}/auth/reset-password?token={token}"
    
    html_content = get_password_reset_template(reset_url, user_name)
    text_content = f"""
    Market Flick AI Password Reset
    
    You requested a password reset. Please visit the following link to set a new password:
    {reset_url}
    
    If you did not request a password reset, please ignore this email.
    This link will expire in 1 hour.
    """
    
    return send_email(email, "Reset your password", html_content, text_content)

def should_skip_verification() -> bool:
    """Check if email verification should be skipped."""
    return SKIP_EMAIL_VERIFICATION
