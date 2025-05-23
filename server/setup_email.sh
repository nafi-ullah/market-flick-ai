#!/bin/bash

# Setup script for email configuration
echo "=== Market Flick AI - Email Service Configuration Setup ==="
echo "This script will help you configure email notifications for authentication."
echo

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Please make sure you're running this script from the server directory."
    exit 1
fi

# Email provider selection
echo "Choose an email service provider:"
echo "1) SMTP (Gmail, Outlook, etc.)"
echo "2) Amazon SES"
read -p "Select provider (1-2): " provider_choice

case $provider_choice in
    1)
        # Configure SMTP
        echo "EMAIL_PROVIDER=\"smtp\"" >> .env
        
        # Get current values
        CURRENT_EMAIL_SENDER=$(grep -o 'EMAIL_SENDER="[^"]*"' .env | cut -d'"' -f2)
        CURRENT_EMAIL_SERVER=$(grep -o 'EMAIL_SERVER="[^"]*"' .env | cut -d'"' -f2)
        CURRENT_EMAIL_PORT=$(grep -o 'EMAIL_PORT="[^"]*"' .env | cut -d'"' -f2)
        CURRENT_EMAIL_USERNAME=$(grep -o 'EMAIL_USERNAME="[^"]*"' .env | cut -d'"' -f2)
        CURRENT_EMAIL_PASSWORD=$(grep -o 'EMAIL_PASSWORD="[^"]*"' .env | cut -d'"' -f2)
        
        echo
        echo "Configure SMTP Email Settings:"
        echo
        
        # Ask for email sender
        echo "Email sender address (current: ${CURRENT_EMAIL_SENDER:-no-reply@marketflick.ai}):"
        read -p "Enter email sender: " email_sender
        if [ ! -z "$email_sender" ]; then
            if grep -q "EMAIL_SENDER=" .env; then
                sed -i "s/EMAIL_SENDER=\".*\"/EMAIL_SENDER=\"$email_sender\"/" .env
            else
                echo "EMAIL_SENDER=\"$email_sender\"" >> .env
            fi
        fi
        
        # Ask for SMTP server
        echo "SMTP server (current: ${CURRENT_EMAIL_SERVER:-smtp.gmail.com}):"
        read -p "Enter SMTP server: " email_server
        if [ ! -z "$email_server" ]; then
            if grep -q "EMAIL_SERVER=" .env; then
                sed -i "s/EMAIL_SERVER=\".*\"/EMAIL_SERVER=\"$email_server\"/" .env
            else
                echo "EMAIL_SERVER=\"$email_server\"" >> .env
            fi
        fi
        
        # Ask for SMTP port
        echo "SMTP port (current: ${CURRENT_EMAIL_PORT:-587}):"
        read -p "Enter SMTP port: " email_port
        if [ ! -z "$email_port" ]; then
            if grep -q "EMAIL_PORT=" .env; then
                sed -i "s/EMAIL_PORT=\".*\"/EMAIL_PORT=\"$email_port\"/" .env
            else
                echo "EMAIL_PORT=\"$email_port\"" >> .env
            fi
        fi
        
        # Ask for SMTP username/email
        echo "SMTP username/email (current: ${CURRENT_EMAIL_USERNAME:-none}):"
        read -p "Enter SMTP username: " email_username
        if [ ! -z "$email_username" ]; then
            if grep -q "EMAIL_USERNAME=" .env; then
                sed -i "s/EMAIL_USERNAME=\".*\"/EMAIL_USERNAME=\"$email_username\"/" .env
            else
                echo "EMAIL_USERNAME=\"$email_username\"" >> .env
            fi
        fi
        
        # Ask for SMTP password
        echo "SMTP password (current: ${CURRENT_EMAIL_PASSWORD:-none}):"
        read -p "Enter SMTP password: " email_password
        if [ ! -z "$email_password" ]; then
            if grep -q "EMAIL_PASSWORD=" .env; then
                sed -i "s/EMAIL_PASSWORD=\".*\"/EMAIL_PASSWORD=\"$email_password\"/" .env
            else
                echo "EMAIL_PASSWORD=\"$email_password\"" >> .env
            fi
        fi
        
        echo "SMTP configuration complete."
        ;;
    2)
        # Configure Amazon SES
        echo "EMAIL_PROVIDER=\"ses\"" >> .env
        
        # Get current values
        CURRENT_EMAIL_SENDER=$(grep -o 'EMAIL_SENDER="[^"]*"' .env | cut -d'"' -f2)
        CURRENT_AWS_ACCESS_KEY=$(grep -o 'AWS_ACCESS_KEY_ID="[^"]*"' .env | cut -d'"' -f2)
        CURRENT_AWS_SECRET_KEY=$(grep -o 'AWS_SECRET_ACCESS_KEY="[^"]*"' .env | cut -d'"' -f2)
        CURRENT_AWS_REGION=$(grep -o 'AWS_REGION="[^"]*"' .env | cut -d'"' -f2)
        
        echo
        echo "Configure Amazon SES Settings:"
        echo
        echo "Note: You must verify your sender email in the AWS SES console before sending emails."
        echo
        
        # Ask for email sender
        echo "Email sender address (current: ${CURRENT_EMAIL_SENDER:-no-reply@marketflick.ai}):"
        read -p "Enter email sender: " email_sender
        if [ ! -z "$email_sender" ]; then
            if grep -q "EMAIL_SENDER=" .env; then
                sed -i "s/EMAIL_SENDER=\".*\"/EMAIL_SENDER=\"$email_sender\"/" .env
            else
                echo "EMAIL_SENDER=\"$email_sender\"" >> .env
            fi
        fi
        
        # Ask for AWS credentials
        echo "AWS Access Key ID (current: ${CURRENT_AWS_ACCESS_KEY:-none}):"
        read -p "Enter AWS Access Key ID: " aws_access_key
        if [ ! -z "$aws_access_key" ]; then
            if grep -q "AWS_ACCESS_KEY_ID=" .env; then
                sed -i "s/AWS_ACCESS_KEY_ID=\".*\"/AWS_ACCESS_KEY_ID=\"$aws_access_key\"/" .env
            else
                echo "AWS_ACCESS_KEY_ID=\"$aws_access_key\"" >> .env
            fi
        fi
        
        echo "AWS Secret Access Key (current: ${CURRENT_AWS_SECRET_KEY:-none}):"
        read -p "Enter AWS Secret Access Key: " aws_secret_key
        if [ ! -z "$aws_secret_key" ]; then
            if grep -q "AWS_SECRET_ACCESS_KEY=" .env; then
                sed -i "s/AWS_SECRET_ACCESS_KEY=\".*\"/AWS_SECRET_ACCESS_KEY=\"$aws_secret_key\"/" .env
            else
                echo "AWS_SECRET_ACCESS_KEY=\"$aws_secret_key\"" >> .env
            fi
        fi
        
        echo "AWS Region (current: ${CURRENT_AWS_REGION:-us-east-1}):"
        read -p "Enter AWS Region: " aws_region
        if [ ! -z "$aws_region" ]; then
            if grep -q "AWS_REGION=" .env; then
                sed -i "s/AWS_REGION=\".*\"/AWS_REGION=\"$aws_region\"/" .env
            else
                echo "AWS_REGION=\"$aws_region\"" >> .env
            fi
        fi
        
        echo "Amazon SES configuration complete."
        ;;
    *)
        echo "Invalid selection. Using default SMTP configuration."
        echo "EMAIL_PROVIDER=\"smtp\"" >> .env
        ;;
esac

# Configure email verification setting
echo
echo "Email verification settings:"

read -p "Skip email verification in development? (y/n, default: n): " skip_verification
if [[ $skip_verification == "y" ]]; then
    if grep -q "SKIP_EMAIL_VERIFICATION=" .env; then
        sed -i "s/SKIP_EMAIL_VERIFICATION=\".*\"/SKIP_EMAIL_VERIFICATION=\"true\"/" .env
    else
        echo "SKIP_EMAIL_VERIFICATION=\"true\"" >> .env
    fi
    echo "Email verification will be skipped."
else
    if grep -q "SKIP_EMAIL_VERIFICATION=" .env; then
        sed -i "s/SKIP_EMAIL_VERIFICATION=\".*\"/SKIP_EMAIL_VERIFICATION=\"false\"/" .env
    else
        echo "SKIP_EMAIL_VERIFICATION=\"false\"" >> .env
    fi
    echo "Email verification will be required."
fi

# Configure frontend URL for email links
CURRENT_FRONTEND_URL=$(grep -o 'FRONTEND_URL="[^"]*"' .env | cut -d'"' -f2)
echo
echo "Frontend URL for links in emails (current: ${CURRENT_FRONTEND_URL:-http://localhost:3000}):"
read -p "Enter frontend URL (leave empty to keep current): " frontend_url
if [ ! -z "$frontend_url" ]; then
    if grep -q "FRONTEND_URL=" .env; then
        sed -i "s|FRONTEND_URL=\".*\"|FRONTEND_URL=\"$frontend_url\"|" .env
    else
        echo "FRONTEND_URL=\"$frontend_url\"" >> .env
    fi
fi

# Install required packages
echo
echo "Installing required packages..."
pip install boto3 emails python-dotenv

echo
echo "=== Email Service Setup Complete ==="
echo "You can now use email services for verification emails and password reset emails."
echo "If you want to test the email configuration, run: python test_email_service.py"
echo "Make sure your virtual environment is activated before testing."
echo

# Remind about virtual environment for testing
if [ -d "venv" ]; then
    echo "To activate your virtual environment:"
    echo "  source venv/bin/activate  # For Linux/Mac"
    echo "  .\\venv\\Scripts\\activate  # For Windows"
fi

# Setup complete
echo "Email configuration completed successfully."
