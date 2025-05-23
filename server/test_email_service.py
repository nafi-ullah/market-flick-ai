"""
Test script for verifying that email services are properly configured
"""
import os
import sys
from dotenv import load_dotenv
from utils.email_service import send_email, send_verification_email, send_password_reset_email
from utils.email_service import EMAIL_PROVIDER

# Load environment variables
load_dotenv()

def main():
    print("=== Market Flick AI - Email Service Test Utility ===")
    
    # Check configuration
    email_provider = os.getenv("EMAIL_PROVIDER", "smtp")
    email_sender = os.getenv("EMAIL_SENDER", "")
    frontend_url = os.getenv("FRONTEND_URL", "")
    
    if email_provider.lower() == "smtp":
        email_username = os.getenv("EMAIL_USERNAME", "")
        email_password = os.getenv("EMAIL_PASSWORD", "")
        if not email_username or not email_password:
            print("Error: SMTP credentials are not configured in .env file.")
            print("Please run setup_email.sh first and configure SMTP settings.")
            sys.exit(1)
    elif email_provider.lower() == "ses":
        aws_key = os.getenv("AWS_ACCESS_KEY_ID", "")
        aws_secret = os.getenv("AWS_SECRET_ACCESS_KEY", "")
        if not aws_key or not aws_secret:
            print("Error: AWS credentials are not configured in .env file.")
            print("Please run setup_email.sh first and configure AWS SES settings.")
            sys.exit(1)
    
    if not email_sender:
        print("Warning: EMAIL_SENDER is not configured in .env file.")
        print("Using default sender: no-reply@marketflick.ai")
    
    if not frontend_url:
        print("Warning: FRONTEND_URL is not configured in .env file.")
        print("Using default URL: http://localhost:3000")
    
    print(f"\nCurrent email provider: {email_provider.upper()}")
    
    # Ask user which type of email to test
    print("\nWhich email would you like to test?")
    print("1. Generic test email")
    print("2. Verification email")
    print("3. Password reset email")
    
    choice = input("Enter choice (1, 2, or 3): ")
    recipient = input("Enter recipient email address: ")
    
    success = False
    
    if choice == "1":
        print("\nSending test email...")
        success = send_email(
            to_email=recipient,
            subject="Market Flick AI - Test Email",
            html_content="""
            <h1>Market Flick AI Test Email</h1>
            <p>This is a test email to verify your email service integration is working correctly.</p>
            <p>If you received this email, your email configuration is working properly.</p>
            """,
            text_content="Market Flick AI Test Email\n\nThis is a test email to verify your email service integration is working correctly.\nIf you received this email, your email configuration is working properly."
        )
    elif choice == "2":
        print("\nSending test verification email...")
        success = send_verification_email(
            email=recipient,
            token="test-verification-token-123456",
            user_name="Test User"
        )
    elif choice == "3":
        print("\nSending test password reset email...")
        success = send_password_reset_email(
            email=recipient,
            token="test-reset-token-123456",
            user_name="Test User"
        )
    else:
        print("Invalid choice. Please run the script again and select 1, 2, or 3.")
        sys.exit(1)
    
    if success:
        print("\nSuccess! Email sent successfully.")
        print("Please check the recipient's inbox.")
    else:
        print("\nError: Failed to send the email.")
        print("Check the console output above for error details.")

if __name__ == "__main__":
    main()
