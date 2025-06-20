"""
HTML email templates for Market Flick AI
"""

def get_verification_email_template(verification_url: str, user_name: str = None) -> str:
    """
    Get the HTML template for verification emails.
    
    Args:
        verification_url: URL for email verification
        user_name: Optional name of the user
        
    Returns:
        str: HTML content for the verification email
    """
    greeting = f"Hi {user_name}," if user_name else "Hi there,"
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify your Market Flick AI account</title>
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .container {{
                background-color: #f9f9f9;
                border-radius: 5px;
                padding: 20px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }}
            .header {{
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #eee;
                margin-bottom: 20px;
            }}
            .logo {{
                font-size: 24px;
                font-weight: bold;
                color: #2563eb;
            }}
            .btn {{
                display: inline-block;
                background-color: #2563eb;
                color: white !important;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 4px;
                margin: 20px 0;
                font-weight: 700;
                font-size: 16px;
                text-shadow: 0 1px 1px rgba(0,0,0,0.2);
            }}
            .footer {{
                margin-top: 30px;
                font-size: 12px;
                color: #888;
                text-align: center;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Market Flick AI</div>
            </div>
            
            <p>{greeting}</p>
            <p>Thank you for signing up for Market Flick AI. To complete your registration and verify your email address, please click the button below:</p>
            
            <div style="text-align: center;">
                <a href="{verification_url}" class="btn" style="background-color: #2563eb; color: white !important; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: 700; display: inline-block; font-size: 16px; text-shadow: 0 1px 1px rgba(0,0,0,0.2);">Verify Email Address</a>
            </div>
            
            <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
            <p style="word-break: break-all;"><a href="{verification_url}">{verification_url}</a></p>
            
            <p>If you didn't create this account, you can safely ignore this email.</p>
            
            <p>Best regards,<br>The Market Flick AI Team</p>
            
            <div class="footer">
                <p>© 2025 Market Flick AI. All rights reserved.</p>
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    """

def get_password_reset_template(reset_url: str, user_name: str = None) -> str:
    """
    Get the HTML template for password reset emails.
    
    Args:
        reset_url: URL for password reset
        user_name: Optional name of the user
        
    Returns:
        str: HTML content for the password reset email
    """
    greeting = f"Hi {user_name}," if user_name else "Hi there,"
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset your Market Flick AI password</title>
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .container {{
                background-color: #f9f9f9;
                border-radius: 5px;
                padding: 20px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }}
            .header {{
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #eee;
                margin-bottom: 20px;
            }}
            .logo {{
                font-size: 24px;
                font-weight: bold;
                color: #2563eb;
            }}
            .btn {{
                display: inline-block;
                background-color: #2563eb;
                color: white !important;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 4px;
                margin: 20px 0;
                font-weight: 700;
                font-size: 16px;
                text-shadow: 0 1px 1px rgba(0,0,0,0.2);
            }}
            .footer {{
                margin-top: 30px;
                font-size: 12px;
                color: #888;
                text-align: center;
            }}
            .warning {{
                color: #e53e3e;
                font-size: 14px;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Market Flick AI</div>
            </div>
            
            <p>{greeting}</p>
            <p>We received a request to reset your password for your Market Flick AI account. To set a new password, please click the button below:</p>
            
            <div style="text-align: center;">
                <a href="{reset_url}" class="btn" style="background-color: #2563eb; color: white !important; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: 700; display: inline-block; font-size: 16px; text-shadow: 0 1px 1px rgba(0,0,0,0.2);">Reset Password</a>
            </div>
            
            <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
            <p style="word-break: break-all;"><a href="{reset_url}">{reset_url}</a></p>
            
            <p class="warning">This link will expire in 1 hour for security reasons.</p>
            
            <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            
            <p>Best regards,<br>The Market Flick AI Team</p>
            
            <div class="footer">
                <p>© 2025 Market Flick AI. All rights reserved.</p>
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    """
