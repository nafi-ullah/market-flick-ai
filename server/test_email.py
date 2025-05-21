#!/usr/bin/env python
import os
from dotenv import load_dotenv
import emails
import sys

# Load environment variables
load_dotenv()

# Get email configuration
EMAIL_SENDER = os.getenv("EMAIL_SENDER", "no-reply@marketflick.ai")
EMAIL_SERVER = os.getenv("EMAIL_SERVER", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME", "")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")

def test_email_config(recipient_email):
    """Test sending an email with the current configuration."""
    if not EMAIL_USERNAME or not EMAIL_PASSWORD:
        print("Email credentials are not configured in .env file.")
        return False
    
    message = emails.Message(
        subject="Test Email from Market Flick AI",
        html="""
        <h1>Email Configuration Test</h1>
        <p>This is a test email to verify your email configuration is working correctly.</p>
        <p>If you received this email, your configuration is correct!</p>
        """,
        mail_from=(EMAIL_SENDER, "Market Flick AI Test")
    )
    
    try:
        print(f"Attempting to send test email to {recipient_email}...")
        response = message.send(
            to=recipient_email,
            smtp={
                "host": EMAIL_SERVER, 
                "port": EMAIL_PORT, 
                "user": EMAIL_USERNAME, 
                "password": EMAIL_PASSWORD, 
                "tls": True
            }
        )
        
        success = response.status_code == 250
        if success:
            print("Email sent successfully!")
        else:
            print(f"Failed to send email. Status code: {response.status_code}")
        
        return success
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1:
        recipient = sys.argv[1]
    else:
        recipient = input("Enter recipient email address to test: ")
    
    test_email_config(recipient)
