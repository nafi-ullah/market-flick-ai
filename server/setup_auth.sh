#!/bin/bash

# Market Flick AI - Auth System Setup Script
echo "=== Market Flick AI - Authentication System Setup ==="
echo "This script will set up the authentication system for Market Flick AI."
echo

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please update the .env file with your actual API keys and settings."
fi

# Check for virtual environment
if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Creating one..."
    python -m venv venv
    echo "Virtual environment created."
else
    echo "Using existing virtual environment."
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate || . venv/bin/activate

# Check Python dependencies
echo "Checking Python dependencies..."
pip install -r auth-requirements.txt

# Generate JWT secret key if needed
if ! grep -q "JWT_SECRET_KEY=" .env || [[ $(grep -o 'JWT_SECRET_KEY="[^"]*"' .env | cut -d'"' -f2) == "" ]]; then
    echo "Generating JWT secret key..."
    SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
    
    if grep -q "JWT_SECRET_KEY=" .env; then
        # Replace existing JWT_SECRET_KEY line
        sed -i "s/JWT_SECRET_KEY=\".*\"/JWT_SECRET_KEY=\"$SECRET_KEY\"/" .env
    else
        # Add JWT_SECRET_KEY line
        echo "JWT_SECRET_KEY=\"$SECRET_KEY\"" >> .env
    fi
fi

# Set additional JWT config if not present
if ! grep -q "JWT_ALGORITHM=" .env; then
    echo "JWT_ALGORITHM=\"HS256\"" >> .env
fi

if ! grep -q "ACCESS_TOKEN_EXPIRE_MINUTES=" .env; then
    echo "ACCESS_TOKEN_EXPIRE_MINUTES=\"1440\"" >> .env
fi

if ! grep -q "REFRESH_TOKEN_EXPIRE_DAYS=" .env; then
    echo "REFRESH_TOKEN_EXPIRE_DAYS=\"7\"" >> .env
fi

# Setup email verification service
echo
echo "Setting up email verification service..."

# Make setup script executable
chmod +x setup_email.sh

# Run email setup script
./setup_email.sh

echo
echo "=== Authentication System Setup Complete ==="
echo "You can now run the server with: uvicorn main:app --reload"