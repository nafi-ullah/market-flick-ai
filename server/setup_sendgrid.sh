#!/bin/bash

# Setup script for SendGrid email configuration
echo "=== Market Flick AI - SendGrid Configuration Setup ==="
echo "This script will help you configure SendGrid for email notifications."
echo

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Please make sure you're running this script from the server directory."
    exit 1
fi

# Check if SendGrid API key is already configured
CURRENT_KEY=$(grep -o 'SENDGRID_API_KEY="[^"]*"' .env | cut -d'"' -f2)
if [ ! -z "$CURRENT_KEY" ] && [ "$CURRENT_KEY" != "" ]; then
    echo "SendGrid API key is already configured."
    read -p "Do you want to update it? (y/n): " update_key
    if [[ $update_key != "y" ]]; then
        echo "Keeping existing SendGrid configuration."
    else
        configure_sendgrid=true
    fi
else
    configure_sendgrid=true
fi

if [ "$configure_sendgrid" = true ]; then
    echo
    echo "To use SendGrid for sending emails, you need a SendGrid API key."
    echo "If you don't have a SendGrid account yet, please sign up at https://signup.sendgrid.com/"
    echo
    
    read -p "Enter your SendGrid API key: " sendgrid_key
    
    # Update SendGrid API key in .env file
    if grep -q "SENDGRID_API_KEY=" .env; then
        # Replace existing SENDGRID_API_KEY line
        sed -i "s/SENDGRID_API_KEY=\".*\"/SENDGRID_API_KEY=\"$sendgrid_key\"/" .env
    else
        # Add SENDGRID_API_KEY line
        echo "SENDGRID_API_KEY=\"$sendgrid_key\"" >> .env
    fi
    
    echo "SendGrid API key has been updated."
fi

# Configure email sending settings
echo
echo "Configure email sender settings:"

# Get current values
CURRENT_EMAIL_SENDER=$(grep -o 'EMAIL_SENDER="[^"]*"' .env | cut -d'"' -f2)
CURRENT_FRONTEND_URL=$(grep -o 'FRONTEND_URL="[^"]*"' .env | cut -d'"' -f2)

# Ask for email sender
echo "Email sender address (current: ${CURRENT_EMAIL_SENDER:-none}):"
read -p "Enter email sender (leave empty to keep current): " email_sender
if [ ! -z "$email_sender" ]; then
    sed -i "s/EMAIL_SENDER=\".*\"/EMAIL_SENDER=\"$email_sender\"/" .env
fi

# Ask for frontend URL
echo "Frontend URL for links in emails (current: ${CURRENT_FRONTEND_URL:-http://localhost:3000}):"
read -p "Enter frontend URL (leave empty to keep current): " frontend_url
if [ ! -z "$frontend_url" ]; then
    sed -i "s/FRONTEND_URL=\".*\"/FRONTEND_URL=\"$frontend_url\"/" .env
fi

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

echo
echo "=== SendGrid Setup Complete ==="
echo "You can now use SendGrid to send verification emails and password reset emails."
echo "If you want to test the email configuration, run: python test_sendgrid.py"
echo "Make sure your virtual environment is activated before testing."
echo

# Remind about virtual environment for testing
if [ -d "venv" ]; then
    echo "To activate your virtual environment:"
    echo "  source venv/bin/activate  # For Linux/Mac"
    echo "  .\\venv\\Scripts\\activate  # For Windows"
fi

# Setup complete
echo "SendGrid configuration completed successfully."
