"""
Email utility functions for sending emails with SendGrid and emails library as fallback.
"""
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content, HtmlContent
from typing import Optional
import emails
from emails.template import JinjaTemplate
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Email Configuration
EMAIL_SENDER = os.getenv("EMAIL_SENDER", "no-reply@marketflick.ai")
EMAIL_SERVER = os.getenv("EMAIL_SERVER", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME", "")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY", "")
SKIP_EMAIL_VERIFICATION = os.getenv("SKIP_EMAIL_VERIFICATION", "false").lower() == "true"

def send_email_sendgrid(to_email: str, subject: str, html_content: str) -> bool:
    """Send email using SendGrid.
    
    Args:
        to_email: The recipient's email address
        subject: The email subject
        html_content: The email content in HTML format
        
    Returns:
        bool: True if the email was sent successfully, False otherwise
    """
    if not SENDGRID_API_KEY:
        print("SendGrid API key is not configured. Using fallback email method.")
        return False
        
    try:
        message = Mail(
            from_email=EMAIL_SENDER,
            to_emails=to_email,
            subject=subject,
            html_content=html_content
        )
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        return response.status_code == 202
    except Exception as e:
        print(f"Error sending email via SendGrid: {e}")
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

def send_email(to_email: str, subject: str, html_content: str) -> bool:
    """Send email using SendGrid or fallback to emails library.
    
    Args:
        to_email: The recipient's email address
        subject: The email subject
        html_content: The email content in HTML format
        
    Returns:
        bool: True if the email was sent successfully, False otherwise
    """
    # If email verification is skipped, print debug info but still try to send email
    if SKIP_EMAIL_VERIFICATION:
        print(f"Email verification is skipped, but still attempting to send email to {to_email}")
        return True
    
    # Try SendGrid first
    if send_email_sendgrid(to_email, subject, html_content):
        return True
    
    # Fall back to SMTP if SendGrid fails
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
    
    return send_email(email, "Verify your email address", html_content)

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
    
    return send_email(email, "Reset your password", html_content)

def should_skip_verification() -> bool:
    """Check if email verification should be skipped."""
    return SKIP_EMAIL_VERIFICATION
