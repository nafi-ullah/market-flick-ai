"""
Test script for verifying that SendGrid is properly configured
"""
import os
import sys
from dotenv import load_dotenv
from utils.email_utils import send_email, send_verification_email, send_password_reset_email

# Load environment variables
load_dotenv()

def main():
    print("=== Market Flick AI - Email Test Utility ===")
    
    # Check configuration
    sendgrid_api_key = os.getenv("SENDGRID_API_KEY", "")
    email_sender = os.getenv("EMAIL_SENDER", "")
    frontend_url = os.getenv("FRONTEND_URL", "")
    
    if not sendgrid_api_key:
        print("Error: SENDGRID_API_KEY is not configured in .env file.")
        print("Please run setup_sendgrid.sh first.")
        sys.exit(1)
    
    if not email_sender:
        print("Warning: EMAIL_SENDER is not configured in .env file.")
        print("Using default sender: no-reply@marketflick.ai")
    
    if not frontend_url:
        print("Warning: FRONTEND_URL is not configured in .env file.")
        print("Using default URL: http://localhost:3000")
    
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
            <p>This is a test email to verify your SendGrid integration is working correctly.</p>
            """
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
